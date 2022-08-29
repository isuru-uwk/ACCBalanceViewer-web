import { environment } from './../environments/environment';
import { JWTInterceptor } from './msal/msal.interceptor';
import { ReportService } from './services/report.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MsalGuard, MsalGuardConfiguration, MsalInterceptorConfiguration, MsalModule, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalService, MsalBroadcastService, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from './components/modules/shared.module';


function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const resourceMap = new Map<string, Array<string>>();
  resourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read']);
  resourceMap.set(environment.api.resourceUri, [environment.api.resourceScope]);

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
      redirectUri:window.location.origin ,
      postLogoutRedirectUri: window.location.origin,
      //navigateToLoginRequestUrl: environment.adconfig.navigateToLoginRequestUrl
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
    authRequest: environment.loginRequest
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
    HttpClientModule,
    SharedModule,
    MsalModule,
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
  bootstrap: [AppComponent,MsalRedirectComponent]
})
export class AppModule { }
