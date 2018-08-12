import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from './article.service';
import { Meta } from '@angular/platform-browser';
import { GlobalAction } from '../actions.service';

@Component({
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})

export class ArticleComponent implements OnDestroy{
    public id: number;
    public data: Array<{}>;
    public loading: boolean = false;
    public lmData : Array<{}>;
    public isStyle : boolean = false;

    constructor(private activeRoute: ActivatedRoute, 
                public articleService: ArticleService, 
                private meta: Meta,
                private globalAction : GlobalAction,
                public route : Router) {

        this.activeRoute.params.subscribe(res => {
            this.isStyle = (activeRoute.snapshot.data[0] && activeRoute.snapshot.data[0]['lm']) ? true : false;
            this.removeMetaImage();
            this.id = res['id'];
            this.loadData();
            this.lm();

            if(!this.id || isNaN(this.id))
                this.route.navigateByUrl('');
        })
    }

    loadData() {
        this.loading = true;
        if(!this.isStyle)
        {
        this.articleService.getArticle(this.id).subscribe((res) => {
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
            }, 999);
        });
   }
    else{
      this.articleService.getLmArticle(this.id).subscribe((res) => {
      this.data = res.post;

           this.data['html'] = this.data['content']['data'].filter(c => c.type == 'text').map(e => e.data.text).join('');
           this.data['image'] = this.data['image_url'];
           this.data['title'] = this.data['name'];

            this.meta.updateTag({ name: 'title', content: this.parseHtmlEntities(this.data['title']) + ' | Star Magazine', charset: 'utf-8' });
            this.meta.updateTag({ name: 'description', content: this.parseHtmlEntities(this.data['description']).substring(0, 160) + '...', charset: 'utf-8' });
            this.meta.updateTag({ name: 'twitter:title', content: this.parseHtmlEntities(this.data['title']) + ' | Star Magazine', charset: 'utf-8' });
            this.meta.updateTag({ name: 'twitter:description', content: this.parseHtmlEntities(this.data['description']).substring(0, 160) + '...', charset: 'utf-8' });
            this.meta.addTag({ name: 'twitter:image', content: this.data['image'] });
            document.title = this.parseHtmlEntities(this.data['title']) + ' | Star Magazine';

        this.loading = false;
       this.globalAction.RelatedArticleStat('features');
       window.scroll({
                top: 0, 
                left: 0, 
                behavior: 'smooth' 
              });
      })
    } 
    }


    lm(){
     this.articleService.getLmArticle().subscribe(res => {
       this.lmData = res.posts.map(p => {
           let img = p.image_url.split('?')[0];
               img = img + '?fit=crop&fm=jpg&h=225&ixjsv=1.1.1&q=74&w=320';
            p.image_url = img;
            return p;
       }).sort(() => Math.random() - .5);
     })
    }


    ngOnDestroy() {
        this.removeMetaImage();
    }

    removeMetaImage(){
      this.meta.removeTag('name="twitter:image"');
            let timg = document.head.querySelectorAll('[name="twitter:image"]');
        if(timg.length)
        for(var i=0; i<timg.length; i++)
           timg[i].remove();
    }

    parseHTML(html){
      html =  this.parseHtmlEntities(this.data['html']);
      var regex = /href\s*=\s*(['"])(https?:\/\/.+?)\1/ig;   
      var link;
      
      while((link = regex.exec(html)) !== null) {
        let anchor = link[2];
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
    var adsAh = document.getElementById('googleAds');
        adsAh.innerHTML = '<ins class="adsbygoogle" style="display:block" '+ 
     ' data-ad-client="ca-pub-1124828165040329" '+ 
     ' data-ad-slot="8700417336" ' +
     ' data-ad-format="auto"></ins>';
    var s = document.createElement('script');
        s.text = '(adsbygoogle=window.adsbygoogle||[]).push({});';
        adsAh.appendChild(s);
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