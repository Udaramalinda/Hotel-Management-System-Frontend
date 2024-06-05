import { CanActivateChildFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { inject } from '@angular/core';

export const authGuard: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree => {
    const token = sessionStorage.getItem('access_token');
    const router = inject(Router);

    if (token) {
        return true;
    }
    else {
        router.navigate(['/login']);
        return false;
    }
};