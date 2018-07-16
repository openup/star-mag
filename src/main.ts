import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  window.console.log = function(){};
  window.console.debug = function(){};
  window.console.error = function(){};
  window.console.warn = function(){};
  window.console.info = function(){};
  window.console.trace = function(){};
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
