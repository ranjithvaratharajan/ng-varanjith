import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import NProgress from 'nprogress'
import { inject } from '@angular/core';
import { LoadingService } from '../service/loading'

let activeRequests = 0;

export const loadingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const loadingService = inject(LoadingService);

  // Ignore certain requests (e.g., static assets)
  if (req.url.includes('/assets/') || req.url.includes('.json')) {
    return next(req);
  }

  activeRequests++;
  if (activeRequests === 1) {
    loadingService.startLoading();
    NProgress.start();
  }

  return next(req).pipe(
    finalize(() => {
      activeRequests--;
      if (activeRequests === 0) {
        loadingService.stopLoading();
        NProgress.done();
      }
    })
  );
};
