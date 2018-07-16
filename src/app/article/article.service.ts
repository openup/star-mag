import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';




@Injectable()
export class ArticleService {
    constructor(private http: HttpClient) {
    }

    private url = 'https://api.star-mag.co.uk/article/id/'



    getArticle(id: number): Observable<any> {

        let art = this.url + id;
      
        return this.http.get(art);
    }

  



}