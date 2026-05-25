import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import {ARTICLES_SERVICE} from './services/articles/articles-service.token'
import { ArticlesService } from './services/articles/articles.service';
import { environment } from '../environments/environment';
import { ArticlesApiService } from './services/articles/articles-api.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimations(),
    provideHttpClient(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled'
      })
    ),
    {
      provide: ARTICLES_SERVICE,
      useClass: environment.useBackendApi ? ArticlesApiService : ArticlesService,
    },
  ]
};
