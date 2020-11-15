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
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchPost();
  }

  onCreatePost(postData: Post): void {
    // Send Http request
    this.http.post<{name: string}>(
      'https://mytest1-320c9.firebaseio.com/posts.json',
      postData
    ).subscribe(responseData => {
      console.log(responseData);
    });
  }

  onFetchPosts(): void {
    // Send Http request
    this.fetchPost();
  }

  onClearPosts(): void {
    // Send Http request
  }

  private fetchPost(): void {
    this.http.get<{ [key: string]: Post}>('https://mytest1-320c9.firebaseio.com/posts.json')
      .pipe(
        map(responseData => {
          const postsAray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)){
              postsAray.push({...responseData[key], id: key});
            }
          }
          return postsAray;
        })
      )
      .subscribe(post => {
        console.log(post);
      });
  }
}
