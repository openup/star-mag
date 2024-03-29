import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule }from '@angular/router';
import { FormsModule } from '@angular/forms';
import { appRouting } from './app.route';
import { ErrorComponent } from './error/error.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { GlobalAction } from './actions.service';
import { SideBarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HeaderComponent,
    SideBarComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    appRouting,
    HttpClientModule,
    FormsModule
  ],
  providers: [GlobalAction],
  bootstrap: [AppComponent]
})
export class AppModule { }
