
import {PopupRequest, RedirectRequest, InteractionType} from '@azure/msal-browser';

export const protectedResources = {
    resource: {
        endpoint: "https://accbalanceviewer-api.azurewebsites.net/",
        scopes: ["api://e54eef7b-4539-4d0f-8d93-e81f0279603a/access_as_user"],
    },
}

export const loginRequest = {
    scopes: ['user.read']
};


export type MsalGuardConfiguration = {
	interactionType: InteractionType.Popup | InteractionType.Redirect;
	authRequest?: PopupRequest | RedirectRequest;
};
