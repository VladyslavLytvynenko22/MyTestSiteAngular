import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
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
            postData,
            {
                observe: 'response'
            }
          ).subscribe(responseData => {
            console.log(responseData);
          }, error => {
            this.error.next(error.message);
          });
    }

    fetchPost(): Observable<Post[]> {
        let searchParams = new HttpParams();
        searchParams = searchParams.append('print', 'pretty');
        searchParams = searchParams.append('custom', 'key');

        return this.http.get<{ [key: string]: Post}>('https://mytest1-320c9.firebaseio.com/posts.json',
            {
                headers: new HttpHeaders({'Custom-Heder': 'Hello'}),
                params: searchParams,
                responseType: 'json'
            }
        )
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
        return this.http.delete('https://mytest1-320c9.firebaseio.com/posts.json',
        {
            observe: 'events',
            responseType: 'text'
        })
        .pipe(
            tap((event: any) => {
                console.log(event);
                if (event.type === HttpEventType.Sent){
                    // ---
                }
                if (event.type === HttpEventType.Response){
                    console.log(event.body);
                }
        }));
    }
}
