import { Injectable } from '@angular/core';
import { Post, PostWithAuthor } from "../models/post";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/switchMap'
import { AuthorService } from "./author.service";
import { Author } from "../models/author";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import * as firebase from 'firebase/app';

@Injectable()
export class PostService {
  readonly postsPath = 'posts';
  readonly postBatchSize = 20;
  private postIncrementStream: Subject<number>;

  postsWithAuthorStream: Observable<PostWithAuthor[]>;
  hideLoadMoreBtn = false;

  constructor(private db: AngularFireDatabase,
    private authorService: AuthorService) {
    this.postIncrementStream = new BehaviorSubject<number>(this.postBatchSize);

    const numPostsStream: Observable<number> = this.postIncrementStream
      .scan<number>((previousTotal: number, currentValue: number) => {
        return previousTotal + currentValue;
      });

    const postsStream: Observable<Post[]> = numPostsStream
      .switchMap<number, Post[]>((numPosts: number) => {
        return this.db.list(this.postsPath, {
          query: {
            limitToLast: numPosts,
          }
        })
      });

    this.postsWithAuthorStream = Observable.combineLatest<PostWithAuthor[]>(
      postsStream,
      this.authorService.authorMapStream,
      numPostsStream,
      (posts: Post[], authorMap: Map<string, Author>, numPostsRequested: number) => {
        const postsWithAuthor: PostWithAuthor[] = [];
        this.hideLoadMoreBtn = numPostsRequested > posts.length;
        for (let post of posts) {
          const postWithAuthor = new PostWithAuthor(post);
          postWithAuthor.author = authorMap[post.authorKey];
          postsWithAuthor.push(postWithAuthor);
        }
        return postsWithAuthor;
      });
  }

  add(post: Post) {
    firebase.database().ref().child(this.postsPath).push(post);
  }

  displayMorePosts() {
    this.postIncrementStream.next(this.postBatchSize);
  }

  remove(keyToRemove: string) {
    this.db.object(`${this.postsPath}/${keyToRemove}`).remove();
  }

  update(key: string, post: Post) {
    this.db.object(`${this.postsPath}/${key}`).set(post);
  }
}
