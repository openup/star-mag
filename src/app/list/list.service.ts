import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';




@Injectable()
export class ListService {
    constructor(private http: HttpClient) {
    }

    private url = 'https://api.star-mag.co.uk/list/page/{{p}}/rows/12';



    getList(p?: number, cat?:string): Observable<any> {
        p=p || 1;
        let list = this.url.replace('{{p}}', p.toString());
        if(cat && cat.length>2 && ['list', 'tag', 'category', 'last'].indexOf(cat)<0)
          list = list + '/cat/' + cat;
        return this.http.get(list);
    }

  



}