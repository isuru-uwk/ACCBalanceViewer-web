import { Inject, Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { MsalService, MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular';
import { Observable, from, EMPTY } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';


import {PopupRequest, RedirectRequest, InteractionType, AuthenticationResult} from '@azure/msal-browser';
import { protectedResources } from "./auth.config";

export type MsalInterceptorConfig = {
	interactionType: InteractionType.Popup | InteractionType.Redirect;
	protectedResourceMap: Map<string, Array<string>>;
	authRequest?: PopupRequest | RedirectRequest;
};

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
    constructor(
		@Inject(MSAL_INTERCEPTOR_CONFIG)
		private msalInterceptorConfig: MsalInterceptorConfig,
		private msalService: MsalService
	) {}

    	/* eslint-disable @typescript-eslint/no-explicit-any */
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const scopes = this.getScopesForEndpoint(req.url);
		const account = this.msalService.instance.getAllAccounts()[0];
		if (!scopes || scopes.length === 0) {
			return next.handle(req);
		}

		return from(this.msalService.instance.acquireTokenSilent({scopes, account})).pipe(
			catchError(() => {
                
				let redirectStartPage = window.location.href;
				this.msalService.instance.acquireTokenRedirect({
					...this.msalInterceptorConfig.authRequest,
					scopes,
					redirectStartPage
				});
				return EMPTY;
			}),
			switchMap((result: AuthenticationResult) => {
				const headers = req.headers.set('Authorization', `Bearer ${result.accessToken}`);

				const requestClone = req.clone({headers});
				return next.handle(requestClone);
			})
		);
	}

	private getScopesForEndpoint(endpoint: string): Array<string> | undefined {
        if(endpoint.includes(protectedResources.resource.endpoint)){
            return protectedResources.resource.scopes
        }
        return [];
	}
}