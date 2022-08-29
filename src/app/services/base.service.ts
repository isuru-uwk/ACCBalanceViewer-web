import { Injectable } from '@angular/core';
import { HttpHeaders, HttpResponseBase } from '@angular/common/http';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable()
export class BaseService {
	constructor(protected _snackBar: MatSnackBar) { }


	// Base request URI for API.
	protected get requestUri(): string {
		return environment.api.resourceUri;
	}

	protected get requestHeaders(): {
		headers: HttpHeaders | { [header: string]: string | Array<string> };
	} {
		const headers = new HttpHeaders({
			'content-type': 'application/json',
			accept: 'application/json, text/plain, */*'
		});
		return { headers };
	}

	public checkAccessDenied(response: HttpResponseBase): boolean {
		if (response instanceof HttpResponseBase) {
			return response.status == 401;
		}
		return false;
	}
	protected handleError(error: HttpResponseBase, continuation: () => Observable<unknown>): Observable<never> {

		if (this.checkAccessDenied(error)) {

			this._snackBar.open('User is not authorized', 'Access Denied!',{duration:5000});
		} else {
			this._snackBar.open(error.statusText, 'Error!',{duration:5000});
		}

		return throwError(error);
	}

}
