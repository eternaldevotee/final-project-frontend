import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('jwt');
    if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }
  return next(req);
};


// intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//   const token = localStorage.getItem('jwt');
//   if (token) {
//     req = req.clone({
//       setHeaders: { Authorization: `Bearer ${token}` }
//     });
//   }
//   return next.handle(req);
// }