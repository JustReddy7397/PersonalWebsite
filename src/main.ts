import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {appConfig} from './app/app.config';

(async () => {
  const app = await bootstrapApplication(AppComponent, appConfig);
})()
