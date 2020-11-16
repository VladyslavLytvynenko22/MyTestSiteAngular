import { PostService } from './post.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DayViewModel } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;

  constructor(private http: HttpClient, private postSrv: PostService) {}

  ngOnInit(): void {
    this.isFetching = true;
    this.postSrv.fetchPost().subscribe(post => {
      this.isFetching = false;
      this.loadedPosts = post;
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
    });
  }

  onClearPosts(): void {
    // Send Http request
  }
}
