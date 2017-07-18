import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from "./+main/main.component";
import { SignInComponent } from "./+sign-in/sign-in.component";
import { MyPostsComponent } from "./+my-posts/my-posts.component";

const routes: Routes = [
    { path: '', pathMatch: 'full', component: MainComponent },
    { path: 'signin', component: SignInComponent },
    { path: 'myposts', component: MyPostsComponent },
    { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
