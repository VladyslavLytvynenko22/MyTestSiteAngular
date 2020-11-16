import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Subject, throwError } from 'rxjs';

import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class PostService {
    error = new Subject<string>();

    constructor(private http: HttpClient){}

    createAndStorePost(title: string, content: string): void {
        const postData: Post = { title, content };

        this.http.post<{name: string}>(
            'https://mytest1-320c9.firebaseio.com/posts.json',
            postData
          ).subscribe(responseData => {
            console.log(responseData);
          }, error => {
            this.error.next(error.message);
          });
    }

    fetchPost(): Observable<Post[]> {
        return this.http.get<{ [key: string]: Post}>('https://mytest1-320c9.firebaseio.com/posts.json')
        .pipe(
          map(responseData => {
            const postsAray: Post[] = [];
            for (const key in responseData) {
              if (responseData.hasOwnProperty(key)){
                postsAray.push({...responseData[key], id: key});
              }
            }
            return postsAray;
          }), catchError( errorRes => {
              // Sent to analytics
              return throwError(errorRes);
          })
        );
    }

    deletePosts(): Observable<object> {
        return this.http.delete('https://mytest1-320c9.firebaseio.com/posts.json');
    }
}
