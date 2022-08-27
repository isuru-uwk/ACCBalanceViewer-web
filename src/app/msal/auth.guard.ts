import { Location } from "@angular/common";
import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MsalGuard, MsalService } from '@azure/msal-angular';
import { Observable, of } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private msalGuard: MsalGuard,
        private msalService: MsalService,
        private location: Location
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let canActivate = this.msalGuard.canActivate(route, state);
        if (canActivate && this.msalService.instance.getActiveAccount()) {
            //Redirect to login
            this.loginInteractively(state.url);
        }
        else {
            console.log(state.url, route?.data['role'] as string);
            if (route?.data['role'] != undefined) {
                // this.checkUserHasRoles(route);
                var assignedRoles = this.msalService.instance.getAllAccounts()[0].idTokenClaims?.roles ?? [];
                if (assignedRoles?.indexOf(route?.data['role'] as string) > -1) {
                    return true;
                } else {
                    return false;
                }
            }
            return true;
        }
        return canActivate;
    }


    private loginInteractively(url: string): Observable<boolean> {

        const redirectStartPage: string = this.getDestinationUrl(url);
        this.msalService.loginRedirect({
            redirectStartPage,
            scopes: [],

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