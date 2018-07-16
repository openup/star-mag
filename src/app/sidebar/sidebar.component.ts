import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GlobalAction } from '../actions.service';

@Component({
    selector: '.site-sidebar',
    templateUrl: './sidebar.component.html'
})

export class SideBarComponent implements OnInit, AfterContentInit, OnDestroy {
    
    public loading : boolean = false;
    private subscription: Subscription = new Subscription();
    public related : Array<{}>;


    constructor(private globalAction : GlobalAction, private http : HttpClient){}
 

    ngOnInit(){
    this.subscription = this.globalAction.RelatedArticleStat().subscribe(r => {
     this.loadData(r); 
    });
   }

loadData(r){
    this.loading = true;
       this.http.get('https://api.star-mag.co.uk/list/page/1/rows/22/cat/' + r).subscribe(data => {
           this.related = Object.keys(data).map(k => {
               let el = data[k]; 
               return {
                   id : el.id,
                   slug : el.title.toLowerCase().replace(/[^a-z0-9]+|\s+/gmi, " ").trim().replace(/ /g, '-'), 
                   title : el.title, 
                   image : el.thumb.replace('$width', 260).replace('$height', 210)}
           }).sort(() => Math.random() - .5).slice(0, 6);
           this.loading = false;
            });
}

ngAfterContentInit(){
    var s = document.createElement('script');
        s.text = '(adsbygoogle=window.adsbygoogle||[]).push({});';
        document.getElementById('GoogleSideAds').appendChild(s);
   }

 scrollTop(){
    window.scroll({
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
      });
 }

 ngOnDestroy(){
     if(this.subscription)
      this.subscription.unsubscribe();
 }

}