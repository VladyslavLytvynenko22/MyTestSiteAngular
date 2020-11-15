import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DayViewModel } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onCreatePost(postData: { title: string; content: string }): void {
    // Send Http request
    
  }

  onFetchPosts(): void {
    // Send Http request
  }

  onClearPosts(): void {
    // Send Http request
  }
}
