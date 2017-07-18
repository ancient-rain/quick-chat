import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { Post } from "../models/post";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['../shared/common.scss', './create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  postBodyText: string;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(): void {
    try {
      const post = new Post({
        postBody: this.postBodyText,
        authorKey: this.authService.currentUserUid,
      });
      console.log('TODO: submit the post', post);
      this.postBodyText = '';
    } catch (e) {
      console.log('Submit failed: ', e);
    }
  }
}
