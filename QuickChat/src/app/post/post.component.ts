import { Component, OnInit, Input } from '@angular/core';
import { Post, PostWithAuthor } from "../models/post";
import { AuthService } from "../services/auth.service";

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

  constructor(private authService: AuthService) {

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
    console.log('TODO: remove');
  }
}
