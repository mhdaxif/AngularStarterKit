import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'hammerjs';
import { MockServer } from './mock/mock-server';

if (environment.production) {
  enableProdMode();
}

if(!environment.production && environment.mock){
  new MockServer().setupMockServer();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
