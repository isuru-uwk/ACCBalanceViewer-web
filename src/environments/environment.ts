// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// export const environment = {
//   production: false,
//   resource: {
//       uri: "https://localhost:7154/",
//       scopes: "api://e54eef7b-4539-4d0f-8d93-e81f0279603a/access_as_user",
//     }
// };

export const environment = {
	production: false,
	envName: 'LocalDevelopment',
	version: '0.0.0',
	adconfig: {
		clientId: '78d818a9-9b05-41a9-ab27-468438b968ae',
		authority: 'https://login.microsoftonline.com/11f2f994-6863-418f-91c1-4a2fdb4ffb39',
		redirectUri: window.location.origin,
		postLogoutRedirectUri: window.location.origin,
		navigateToLoginRequestUrl: true
	},
	cache: {
		cacheLocation: 'sessionStorage'
	},
	loginRequest: {
		scopes: ['user.read', 'openid', 'profile']
	},
	api: {
		resourceUri: 'https://localhost:7154',
		resourceScope: 'api://e54eef7b-4539-4d0f-8d93-e81f0279603a/access_as_user'
	}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
