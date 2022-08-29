import { MsalGuard } from '@azure/msal-angular';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './msal/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "reports",
    canActivate: [AuthGuard],
		loadChildren: () => import('./components/modules/reports.module').then(m => m.ReportsModule)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',

  },
  {
    path: 'code',
    redirectTo: '',
    pathMatch: 'full',

  }, // Needed for hash routing

];



const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      // Don't perform initial navigation in iframes
      initialNavigation: !isIframe ? 'enabledNonBlocking' : 'disabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
