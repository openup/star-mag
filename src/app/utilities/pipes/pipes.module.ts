/**
 * Pipes Module, export all Pipes
 * @author Karim Somai
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/*** Pipes  ***/
import { SafeUrlPipe } from './';

@NgModule({
  imports: [
    CommonModule  
  ],
  declarations: [
    SafeUrlPipe
  ],
  exports : [SafeUrlPipe]
})
export class PipesModule {
}
