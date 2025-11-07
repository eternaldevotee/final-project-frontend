import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  const tokenIsExpired = (t: string | null): boolean => {
    if (!t) return true;
    try {
      const parts = t.split('.');
      // if it's not a JWT, assume it's not a numeric-expiry token and don't treat as expired here
      if (parts.length !== 3) return false;
      const payload = parts[1];
      const decoded = JSON.parse(window.atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
      if (!decoded.exp) return false;
      return Date.now() / 1000 >= decoded.exp;
    } catch (e) {
      // if parsing fails, treat token as expired to force re-login
      return true;
    }
  };

  const isAdminContext = (): boolean => {
    try {
      const current = (router && (router as any).url) || '';
      if (current.startsWith('/admin')) return true;
    } catch (e) {}
    try {
      if (req.url.includes('/admin')) return true;
    } catch (e) {}
    return false;
  };

  if (token && tokenIsExpired(token)) {
    // clear stored auth state
    localStorage.removeItem('token');
    localStorage.setItem('isLoggedIn', 'false');

    if (isAdminContext()) {
      // notify the user and navigate to login only for admin area
      try { window.alert('Session expired. You will be logged out.'); } catch {}
      try { router.navigate(['/login']); } catch {}
    }

    return throwError(() => new Error('Token expired'));
  }

  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(req).pipe(
    catchError((err: any) => {
      // On 401/403, force logout; only show alert + redirect when in admin context
      if (err && (err.status === 401 || err.status === 403)) {
        localStorage.removeItem('token');
        localStorage.setItem('isLoggedIn', 'false');
        if (isAdminContext()) {
          try { window.alert('Session expired or unauthorized. Please log in again.'); } catch {}
          try { router.navigate(['/login']); } catch {}
        }
      }
      return throwError(() => err);
    })
  );
};
