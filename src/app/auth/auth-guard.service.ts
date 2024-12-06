import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { JwtService } from '../shared';
import { AuthService } from './auth.services';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class AuthGuardService  {
    constructor(
        private router: Router,
        private jwtService: JwtService,
        private authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        if (this.jwtService.getToken()) {
            return of(true);
            // this.authService.isAuthenticated.pipe().subscribe(result => {
            //     console.log(result);
            // });
        } else {
            this.router.navigate(['']);
            return of(false);
        }
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authService.isAuthenticated.pipe(take(1));
    }
}
