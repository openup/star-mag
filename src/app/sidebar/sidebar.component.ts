import { Component, OnInit, AfterContentInit, OnDestroy, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GlobalAction } from '../utilities/actions.service';

@Component({
    selector: '.site-sidebar',
    templateUrl: './sidebar.component.html'
})

export class SideBarComponent implements OnInit, AfterContentInit, OnDestroy {
    
    public loading : boolean = false;
    private subscription: Subscription = new Subscription();
    public related : Array<{}>;


    constructor(private globalAction : GlobalAction, private http : HttpClient, private elem : ElementRef){}
 

    ngOnInit(){

    this.subscription = this.globalAction.RelatedArticleStat().subscribe(r => {
     this.loadData(r);
    });

    var b = document.body;
    var total_height = b.scrollHeight;
    var w_width = window.innerWidth;
    if(w_width>800){
    document.addEventListener('scroll', (e : Event) => {
    let scroll_top = window.scrollY;
    let elem_height = this.elem.nativeElement.scrollHeight;
    let fixe_point = elem_height - total_height;
    if(elem_height > total_height){
        if(scroll_top > fixe_point)
           document.body.querySelector('.site-sidebar').setAttribute('fixe', 'true');
        else
        document.body.querySelector('.site-sidebar').removeAttribute('fixe');
    }
    });
    setInterval(() => {
        this.related.sort(() => Math.random() - .5);
    }, 6000);
    }
   }

loadData(r?:string){
    this.loading = true;
       if(!r) r = 'features';
       this.http.get('https://api.star-mag.co.uk/list/page/1/rows/12/cat/' + r).subscribe(data => {
           this.related = Object.keys(data).map(k => {
               let el = data[k]; 
               return {
                   id : el.id,
                   slug : el.title.toLowerCase().replace(/[^a-z0-9]+|\s+/gmi, " ").trim().replace(/ /g, '-'), 
                   title : el.title.trim(), 
                   image : el.thumb.replace('$width', 320).replace('$height', 240)}
           }).sort(() => Math.random() - .5).slice(0, 6);
           this.loading = false;
           this.loadAds();
            });
}

ngAfterContentInit(){
    this.loadAds();
   }

 loadAds(){
    var adsh = this.elem.nativeElement.querySelectorAll('[googleAds]');
       adsh.forEach(ads => {

        ads.innerHTML = '<ins class="adsbygoogle" style="display:block" '+ 
         ' data-ad-client="ca-pub-1124828165040329" ' +  
         ' data-ad-slot="8700417336" ' + 
         ' data-ad-format="auto"></ins>';
    var s = document.createElement('script');
        s.text = '(adsbygoogle=window.adsbygoogle||[]).push({});';
        ads.appendChild(s);
    });
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