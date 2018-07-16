import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { GlobalAction } from '../actions.service';


@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent{

   constructor(private meta: Meta, private globalAction : GlobalAction) {
    document.title = 'The latest celebrities news | Star Magazine';
   	this.meta.updateTag({ name: 'title', content : 'The latest celebrities news | Star Magazine' });
    this.meta.updateTag({ name: 'description', content : 'Get the latest news about celebrities, royals, music, TV, and real people. Find exclusive content, on star-mag.co.uk.' });
    this.meta.updateTag({ name: 'twitter:title', content: 'The latest celebrities news | Star Magazine' });
    this.meta.updateTag({ name: 'twitter:description', content: 'Get the latest news about celebrities, royals, music, TV, and real people. Find exclusive content, on star-mag.co.uk.'});
   
    this.globalAction.RelatedArticleStat('features');
   
    
   }

}
