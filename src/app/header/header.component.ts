import{Component, AfterViewInit, ElementRef} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector : 'starmag-header',
    templateUrl: './header.component.html'
  })
  
  export class HeaderComponent implements AfterViewInit{
    public showmenu : boolean = false;
    constructor(public router : Router, private elem : ElementRef){}

    Submit(f: NgForm) {
        let q = f.value.q.replace(' ', '_').toLowerCase();
        this.router.navigate(['/', 'tag', q]);
    }

    ngAfterViewInit(){
      let c = this;
    let docbody = window.document;
    docbody.addEventListener('click', (e) => {
      let menu = this.elem.nativeElement.querySelector('nav');
      if (!menu.contains(e.target)) { // If click outside
        this.showmenu = false;
      }

    });
    }
  }