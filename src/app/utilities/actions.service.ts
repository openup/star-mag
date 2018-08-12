import { Injectable } from '@angular/core';
import { Subject, Observable} from "rxjs";


@Injectable()

export class GlobalAction {

    private retaltedArticles: Subject<string> = new Subject();


    RelatedArticleStat(related?): Observable<string> {
        if (related) {
            this.retaltedArticles.next(related);
        }
        return this.retaltedArticles;
    }
}