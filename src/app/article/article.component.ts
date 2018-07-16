import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from './article.service';
import { Meta } from '@angular/platform-browser';
import { GlobalAction } from '../actions.service';

@Component({
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})

export class ArticleComponent implements OnDestroy {
    public id: number;
    public data: Array<{}>;
    public loading: boolean = false;

    constructor(private activeRoute: ActivatedRoute, 
                public articleService: ArticleService, 
                private meta: Meta,
                private globalAction : GlobalAction,
                public route : Router) {
        this.activeRoute.params.subscribe(res => {
            this.id = res['id'];
            this.loadData();

        })
    }

    loadData() {
        this.loading = true;
        this.articleService.getArticle(this.id).subscribe(res => {
            this.data = res[0];
            this.data['html'] = this.parseHTML(this.data['html']);
            this.loading = false;
            let related = this.data['related'].split('latest.xml?category=')[1];
            if(related.length>0)
            this.globalAction.RelatedArticleStat(related);
            this.meta.updateTag({ name: 'title', content: this.parseHtmlEntities(this.data['title']) + ' | Star Magazine', charset: 'utf-8' });
            this.meta.updateTag({ name: 'description', content: this.parseHtmlEntities(this.data['description']).substring(0, 160) + '...', charset: 'utf-8' });
            this.meta.updateTag({ name: 'twitter:title', content: this.parseHtmlEntities(this.data['title']) + ' | Star Magazine', charset: 'utf-8' });
            this.meta.updateTag({ name: 'twitter:description', content: this.parseHtmlEntities(this.data['description']).substring(0, 160) + '...', charset: 'utf-8' });
            this.meta.addTag({ name: 'twitter:image', content: this.data['image'] });
            document.title = this.parseHtmlEntities(this.data['title']) + ' | Star Magazine';
            setTimeout(() => {
            this.addListener();
            }, 1200);
        })
    }

    ngOnDestroy() {
        this.meta.removeTag('name="twitter:image"');
    }

    parseHTML(html){
      html =  this.parseHtmlEntities(this.data['html']);
      var regex = /href\s*=\s*(['"])(https?:\/\/.+?)\1/ig;   
      var link;
      
      while((link = regex.exec(html)) !== null) {
        let anchor = link[2];
        console.log(link)
        if(anchor.match('eonline.com')){
           let reg = /(\/\d+(\.\d)*)/gi;
           let id = anchor.match(reg)[0];
           let slug = anchor.split(id)[1];
           html = html.replace(anchor, 'article'+id + slug);
        }
      }

      return html;
      
      //.replace(/https:\/\/www.eonline.com\/news/g, 'article');
    }
 
    parseHtmlEntities(str) {
        return str.replace(/&#([0-9]{1,4});/gi, function (match, numStr) {
            var num = parseInt(numStr, 10);
            return String.fromCharCode(num);
        });
    }


   loadAdsScript(){
    var s = document.createElement('script');
        s.text = '(adsbygoogle=window.adsbygoogle||[]).push({});';
        document.getElementById('googleAds').appendChild(s);
   }

    addListener(){
        this.loadAdsScript();
        let c = this;
       let article = document.querySelectorAll('article a');
        
        if(article.length>0)
        Object.keys(article).forEach(o => {
            var el = article[o]; 
             el.addEventListener('click', function(e){
         let link = e.target['href'];
         if(/\/article|post\//i.test(link) === false)
           window.open(link);
        else{
            e.target['target']="_self";
            let link = e.target['href'].replace(window.location.origin, '');
            c.route.navigateByUrl(link);
            window.scroll({
                top: 0, 
                left: 0, 
                behavior: 'smooth' 
              });
        }
         e.preventDefault();
         e.stopPropagation();
         return false;
       });
    })
    }

}