import { Injectable } from '@angular/core';
import { Post } from "../models/post";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

@Injectable()
export class PostService {
  readonly postsPath = 'posts';
  private _postsStream: FirebaseListObservable<Post[]>

  constructor(private db: AngularFireDatabase) {
    this._postsStream = this.db.list(this.postsPath);
  }

  add(post: Post) {
    this._postsStream.push(post);
  }
}
