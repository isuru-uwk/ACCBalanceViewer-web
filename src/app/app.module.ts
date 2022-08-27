import { environment } from './../environments/environment';
import { JWTInterceptor } from './msal/msal.interceptor';
import { loginRequest } from './msal/auth.config';
import { ReportService } from './services/report.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MsalGuard, MsalGuardConfiguration, MsalInterceptorConfiguration, MsalModule, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from './components/modules/shared.module';


function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const resourceMap = new Map<string, Array<string>>();
  resourceMap.set(environment.api.resourceUri, [environment.api.resourceScope]);
  resourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read']);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap: resourceMap
  };
}

function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.adconfig.clientId,
      authority: environment.adconfig.authority,
      redirectUri: environment.adconfig.redirectUri,
      postLogoutRedirectUri: environment.adconfig.postLogoutRedirectUri,
      navigateToLoginRequestUrl: environment.adconfig.navigateToLoginRequestUrl
    },
    cache: {
      cacheLocation: environment.cache.cacheLocation,
      storeAuthStateInCookie: false
    }
  });
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: loginRequest
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MsalModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptor,
      multi: true
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    ReportService,
    MsalService,
    MsalGuard,
    MsalBroadcastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
