import { PostService } from './post.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  errorSubscription: Subscription;

  constructor(private http: HttpClient, private postSrv: PostService) {}

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.errorSubscription = this.postSrv.error.subscribe(error => {
      this.isFetching = false;
      this.error = error;
    });

    this.isFetching = true;
    this.postSrv.fetchPost().subscribe(post => {
      this.isFetching = false;
      this.loadedPosts = post;
    }, error => {
      this.isFetching = false;
      this.error = error.message;
    });
  }

  onCreatePost(postData: Post): void {
    // Send Http request
    this.postSrv.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts(): void {
    // Send Http request
    this.isFetching = true;
    this.postSrv.fetchPost().subscribe(post => {
      this.isFetching = false;
      this.loadedPosts = post;
    }, error => {
      this.isFetching = false;
      this.error = error.message;
      console.log(error);
    });
  }

  onClearPosts(): void {
    // Send Http request
    this.postSrv.deletePosts().subscribe(() => {
      this.onFetchPosts();
    });
  }

  onHandleError(): void {
    this.error = null;
  }
}
