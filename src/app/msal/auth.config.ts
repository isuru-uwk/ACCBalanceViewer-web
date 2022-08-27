
import { LogLevel, Configuration, BrowserCacheLocation } from '@azure/msal-browser';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

export const MsalConfig: Configuration = {
    auth: {
        clientId: '78d818a9-9b05-41a9-ab27-468438b968ae',
        authority: 'https://login.microsoftonline.com/11f2f994-6863-418f-91c1-4a2fdb4ffb39',
        redirectUri: '/',
    },
    cache: {
        cacheLocation: BrowserCacheLocation.LocalStorage,
        storeAuthStateInCookie: isIE,
    },
    system: {
        loggerOptions: {
            loggerCallback(logLevel: LogLevel, message: string) {
                console.log(message);
            },
            logLevel: LogLevel.Verbose,
            piiLoggingEnabled: false
        }
    }
}

export const protectedResources = {
    resource: {
        endpoint: "https://localhost:7154/",
        scopes: ["api://e54eef7b-4539-4d0f-8d93-e81f0279603a/access_as_user"],
    },
}

export const loginRequest = {
    scopes: []
};