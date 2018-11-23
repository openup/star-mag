import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../../list.service';


@Component({
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.scss']
})

export class ArticlesComponent implements OnInit, AfterViewInit {
    public q: any;
    public data: Array<{}>;
    public loading : boolean = true;
    public page : number = 1;
    public previouspage : number = 1;
    public nextpage : number = 2;
    public path : string;
    public nextIsDisabled : boolean = false;
    public previousIsDisabled : boolean = false;

    constructor(private activeRoute: ActivatedRoute, public listService: ListService, private elem : ElementRef) {
        this.activeRoute.params.subscribe(res => {
            this.q = res['query'];
            this.page = res['p'] || 1;
            this.loadData();
            this.previouspage = this.page>1 ? this.page - 1 : 1;
            this.nextpage = this.page - (-1);
            this.path = '/';
            if(this.q != '' && this.q != undefined)
             if(!Number.isInteger(this.q * 1))
              if(['list', 'tag', 'category', 'last', 'p'].indexOf(this.q) < 0)
              this.path = '/category/'  + this.q;
            
             this.previousIsDisabled = this.page < 2 ? true : false;

        })
        
    }

    ngOnInit() {
        this.loadData();
    }

    ngAfterViewInit(){
        let c = this;
        const w_width = window.innerWidth;
        const w_height = window.innerHeight;
        if(w_width<800){
        document.addEventListener('scroll', (e : Event) => {
        let scroll_top = window.scrollY;
        let bottomScroll = scroll_top + w_height;
        console.log('Bottom Scroll : ', bottomScroll)
        let imgs = c.elem.nativeElement.querySelectorAll('.article-single.img-hidden');
        imgs.forEach(i => {
            let iot = i.offsetTop;
            if(iot < bottomScroll){
                i.classList.remove("img-hidden");
                let img = i.querySelector('img');
                let src = img.getAttribute('data-src');
                img.setAttribute('src', src);
            }
        });

        });
      }
    }

    loadData() {
        this.loading = true;
        this.data = [];
        this.listService.getList(this.page, this.q).subscribe((res) => {
            this.data = res.map((obj) => {
                obj.thumb = obj.thumb.replace('$width', 480).replace('$height', 360);
                obj['slug'] = obj.title.toLowerCase().replace(/[^a-z0-9]+|\s+/gmi, " ").trim().replace(/ /g, '-');
                obj['title'] = obj.title.trim();
                return obj;
            });
            if(this.data.length < 12){
             --this.nextpage;
             this.nextIsDisabled = true;
            }
            else
            {
                this.nextIsDisabled = false;
            }
            this.loading = false;
        }, 
     (error) => {
         this.loading = false;
         console.log(error);
     })
    }

    scrollTop(){
        window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
          });
    }

}