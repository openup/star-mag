import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';




@Injectable()
export class ArticleService {
    constructor(private http: HttpClient) {
    }

    private url = 'https://api.star-mag.co.uk/article/id/'
    private lm = 'https://api.star-mag.co.uk/style/';


    getArticle(id: number): Observable<any> {

        let art = this.url + id;
      
        return this.http.get(art);
    }

  
      getLmArticle(id?: number): Observable<any> {
          let ulm = this.lm;
        if(id)
        	 ulm+='id/'+id;
         else
             ulm+='page/1';
        return this.http.get(ulm);

    }




}