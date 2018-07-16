import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../../list.service';


@Component({
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.scss']
})

export class ArticlesComponent implements OnInit {
    public q: any;
    public data: Array<{}>;
    public loading : boolean = true;
    public page : number = 1;
    public previouspage : number = 1;
    public nextpage : number = 2;
    public path : string;
    public nextIsDisabled : boolean = false;
    public previousIsDisabled : boolean = false;

    constructor(private activeRoute: ActivatedRoute, public listService: ListService) {
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
            console.log('qq :',this.q)
            console.log(this.q * 1)
        })
        
    }

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.loading = true;
        this.data = [];
        this.listService.getList(this.page, this.q).subscribe((res) => {
            this.data = res.map((obj) => {
                obj.thumb = obj.thumb.replace('$width', 320).replace('$height', 280);
                obj['slug'] = obj.title.toLowerCase().replace(/[^a-z0-9]+|\s+/gmi, " ").trim().replace(/ /g, '-')
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