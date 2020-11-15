import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostService {

    constructor(private http: HttpClient){}

    createAndStorePost(title: string, content: string): void {
        const postData: Post = { title, content };

        this.http.post<{name: string}>(
            'https://mytest1-320c9.firebaseio.com/posts.json',
            postData
          ).subscribe(responseData => {
            console.log(responseData);
          });
    }

    fetchPost(): void {
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
        });
    }
}