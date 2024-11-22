import { HttpRequest, HttpHandlerFn, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { Observable } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const clonedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });

  return next(clonedRequest);
};
