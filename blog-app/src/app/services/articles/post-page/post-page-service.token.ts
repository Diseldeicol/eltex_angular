import { InjectionToken } from '@angular/core';

import type { PostPageServiceInterface } from './post-page-service.interface';

export const POST_PAGE_SERVICE = new InjectionToken<PostPageServiceInterface>('POST_PAGE_SERVICE');
