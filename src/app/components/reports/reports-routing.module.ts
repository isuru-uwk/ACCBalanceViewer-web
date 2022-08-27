import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/msal/auth.guard';
import { AddReportsComponent } from './add-reports/add-reports.component';
import { ReportsComponent } from './reports/reports.component';
const routes: Routes = [
	{
		path: '',
		component: ReportsComponent,
		canActivate:[AuthGuard]
	},
	{
		path: 'add',
		component: AddReportsComponent,
		canActivate:[AuthGuard],
		data: { role: 'admin' }
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ReportsRoutingModule { }