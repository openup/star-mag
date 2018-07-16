import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router, NavigationEnd,  } from '@angular/router';

@Component({
  selector: '.starmag',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Star Magazine';
   constructor(private meta: Meta, private router : Router) {

    this.router.events.subscribe((e) => {
      if(e instanceof NavigationEnd) {
        (<any>window).ga('set', 'page', e.urlAfterRedirects);
        (<any>window).ga('send', 'pageview');
      }
    })

   	this.meta.addTag({ name: 'title', content : 'The latest celebrities news | Star Magazine' });
    this.meta.addTag({ name: 'description', content : 'Get the latest news about celebrities, royals, music, TV, and real people. Find exclusive content, on star-mag.co.uk.' });
    this.meta.addTag({ name: 'twitter:title', content: 'The latest celebrities news | Star Magazine' });
    this.meta.addTag({ name: 'twitter:description', content: 'Get the latest news about celebrities, royals, music, TV, and real people. Find exclusive content, on star-mag.co.uk.'});

}
}
