import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit {

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.showOnlyMyPosts(true);
  }

}
