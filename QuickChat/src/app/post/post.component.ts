import { Component, OnInit, Input } from '@angular/core';
import { Post, PostWithAuthor } from "../models/post";
import { AuthService } from "../services/auth.service";
import { PostService } from "../services/post.service";
import { MdSnackBar } from "@angular/material";

enum EditMode {
  notEditable = 0,
  displayEditButtons = 1,
  editing = 2,
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['../shared/common.scss', './post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() postWithAuthor: PostWithAuthor;

  editingMode = EditMode.notEditable;

  constructor(private authService: AuthService,
    private postService: PostService,
    private snackBar: MdSnackBar) {

  }

  ngOnInit() {
    if (this.postWithAuthor.authorKey == this.authService.currentUserUid) {
      this.editingMode = EditMode.displayEditButtons;
    }
  }

  enableEditing() {
    console.log('TODO: Enable the edit mode');
  }

  remove() {
    this.postService.remove(this.postWithAuthor.$key);
    const snackBarRef = this.snackBar.open('Post removed', 'UNDO', {
      duration: 7000,
    });
    snackBarRef.onAction().subscribe(() => {
      const restoredPost = new Post();
      
      restoredPost.postBody = this.postWithAuthor.postBody;
      restoredPost.authorKey = this.authService.currentUserUid;
      
      this.postService.update(this.postWithAuthor.$key, restoredPost);
      
      this.snackBar.open('Post restored!', '', {
      duration: 3000,
    });
    });
  }
}
