import { Location } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { Observable, of } from "rxjs";
import { MsalGuardConfiguration } from './auth.config';
import { concatMap, catchError } from 'rxjs/operators';



@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        @Inject(MSAL_GUARD_CONFIG)
        private msalGuardConfig: MsalGuardConfiguration,
        private msalService: MsalService,
        private location: Location
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        return this.msalService.handleRedirectObservable().pipe(
            concatMap(() => {
                if (!this.msalService.instance.getAllAccounts().length) {
                    return this.loginInteractively(state.url);
                }
                if (route?.data['role'] != undefined) {
                    var assignedRoles = this.msalService.instance.getAllAccounts()[0].idTokenClaims?.roles ?? [];
                    if (assignedRoles?.indexOf(route?.data['role'] as string) > -1) {
                        return of(true);
                    } else {
                        return of(false);
                    }
                } else {
                    return of(true);

                }
            }),
            catchError(() => {
                return of(false);
            })
        );

    }


    private loginInteractively(url: string): Observable<boolean> {

        const redirectStartPage: string = this.getDestinationUrl(url);
        this.msalService.loginRedirect({
            redirectStartPage,
            scopes: [],
            ...this.msalGuardConfig.authRequest

        });
        return of(false);
    }

    getDestinationUrl(path: string): string {
        // Absolute base url for the application (default to origin if base element not present)
        const baseElements = document.getElementsByTagName('base');
        const baseUrl = this.location.normalize(baseElements.length ? baseElements[0].href : window.location.origin);

        // Path of page (including hash, if using hash routing)
        const pathUrl: string = this.location.prepareExternalUrl(path);

        // Hash location strategy
        if (pathUrl.startsWith('#')) {
            return `${baseUrl}/${pathUrl}`;
        }

        // If using path location strategy, pathUrl will include the relative portion of the base path (e.g. /base/page).
        // Since baseUrl also includes /base, can just concatentate baseUrl + path
        return `${baseUrl}${path}`;
    }

}