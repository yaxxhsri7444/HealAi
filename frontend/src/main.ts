import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    importProvidersFrom(HttpClientModule),
    ...(appConfig.providers || [])  // Merge with existing providers if any
  ]
})
.catch((err) => console.error(err));