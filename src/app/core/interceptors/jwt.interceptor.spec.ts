import { TestBed } from '@angular/core/testing';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { jwtInterceptor } from './jwt.interceptor';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('jwtInterceptor', () => {
  let routerSpy: any;

  beforeEach(() => {
    routerSpy = { navigate: jasmine.createSpy('navigate'), url: '/' };
    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: routerSpy }]
    });
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
    routerSpy.navigate.calls.reset();
  });

  const run = (req: HttpRequest<any>, next: any) =>
    TestBed.runInInjectionContext(() => jwtInterceptor(req, next));

  function makeJwt(expOffsetSec: number) {
    const payload = { exp: Math.floor(Date.now() / 1000) + expOffsetSec };
    return `a.${btoa(JSON.stringify(payload))}.c`;
  }

  it('should logout and navigate when token expired in admin context', (done) => {
    const token = makeJwt(-10);
    localStorage.setItem('token', token);
    routerSpy.url = '/admin/dashboard';
    const req = new HttpRequest('GET', '/api/admin/data');
    const next = () => of(new HttpResponse({ status: 200 }));

    run(req, next).subscribe({
      next: () => { fail('expected error due to expired token'); done(); },
      error: () => {
        expect(localStorage.getItem('token')).toBeNull();
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
        done();
      }
    });
  });

  it('should clear token silently when expired outside admin', (done) => {
    const token = makeJwt(-10);
    localStorage.setItem('token', token);
    routerSpy.url = '/home';
    const req = new HttpRequest('GET', '/api/public/data');
    const next = () => of(new HttpResponse({ status: 200 }));

    run(req, next).subscribe({
      next: () => { fail('expected error due to expired token'); done(); },
      error: () => {
        expect(localStorage.getItem('token')).toBeNull();
        expect(routerSpy.navigate).not.toHaveBeenCalled();
        done();
      }
    });
  });

  it('should attach Authorization header when token is present and valid', (done) => {
    const token = makeJwt(60);
    localStorage.setItem('token', token);
    routerSpy.url = '/home';
    const req = new HttpRequest('GET', '/api/public/data');

    const next = (r: HttpRequest<any>) => {
      try {
        expect(r.headers.get('Authorization')).toBe(`Bearer ${token}`);
        return of(new HttpResponse({ status: 200 }));
      } catch (e) {
        return throwError(() => e);
      }
    };

    run(req, next).subscribe({
      next: (res) => { expect(res).toBeTruthy(); done(); },
      error: (err) => { fail(err); done(); }
    });
  });

  it('should logout on 401 from admin endpoints', (done) => {
    const token = makeJwt(60);
    localStorage.setItem('token', token);
    routerSpy.url = '/admin/settings';
    const req = new HttpRequest('GET', '/api/admin/protected');
    const next = () => throwError(() => ({ status: 401 }));

    run(req, next).subscribe({
      next: () => { fail('expected error'); done(); },
      error: () => {
        expect(localStorage.getItem('token')).toBeNull();
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
        done();
      }
    });
  });

  it('should NOT navigate on 401 from non-admin endpoints', (done) => {
    const token = makeJwt(60);
    localStorage.setItem('token', token);
    routerSpy.url = '/home';
    const req = new HttpRequest('GET', '/api/public/protected');
    const next = () => throwError(() => ({ status: 401 }));

    run(req, next).subscribe({
      next: () => { fail('expected error'); done(); },
      error: () => {
        expect(localStorage.getItem('token')).toBeNull();
        expect(routerSpy.navigate).not.toHaveBeenCalled();
        done();
      }
    });
  });

});

