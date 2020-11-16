import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({providedIn: 'root'})
export class PostService {

    constructor(private http: HttpClient){}

    createAndStorePost(title: string, content: string): Observable<{ name: string; }> {
        const postData: Post = { title, content };

        return this.http.post<{name: string}>(
            'https://mytest1-320c9.firebaseio.com/posts.json',
            postData
          );
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
          })
        );
    }

    deletePosts(): Observable<object> {
        return this.http.delete('https://mytest1-320c9.firebaseio.com/posts.json');
    }
}
