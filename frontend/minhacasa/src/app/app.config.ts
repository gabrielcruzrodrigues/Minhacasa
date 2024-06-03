import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { CurrencyPipe } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideHttpClient(),
    CurrencyPipe, PageEvent
  ]
};
