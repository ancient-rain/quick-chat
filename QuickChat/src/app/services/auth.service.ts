import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthService {

  public isSignedInStream: Observable<boolean>;
  public displayName: Observable<string>;
  public photoUrl: Observable<string>;
  public _currentUserUid: string;

  constructor(private afAuth: AngularFireAuth,
    private router: Router) {
    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        this._currentUserUid = user.uid;
      } else {
        this._currentUserUid = '';
      }
    });

    this.isSignedInStream = this.afAuth.authState
      .map<firebase.User, boolean>((user: firebase.User) => {
        return user != null;
      });

    this.displayName = this.afAuth.authState
      .map<firebase.User, string>((user: firebase.User) => {
        if (user) {
          return user.displayName;
        }
        return '';
      });

    this.photoUrl = this.afAuth.authState
      .map<firebase.User, string>((user: firebase.User) => {
        if (user) {
          return user.photoURL;
        }
        return '';
      })
  }

  get currentUserUid(): string {
    return this._currentUserUid;
  }

  signInWithGoogle(): void {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((user: firebase.User) => {
        this.router.navigate(['/']);
      });
  }

  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/signin']);
  }
}