import { ReportsRoutingModule } from './../reports/reports-routing.module';
import { ReportService } from './../../services/report.service';
import { AddReportsComponent } from './../reports/add-reports/add-reports.component';
import { ReportsComponent } from './../reports/reports/reports.component';
import { NgModule } from "@angular/core";
import { SharedModule } from './shared.module';


@NgModule({
    declarations: [
        ReportsComponent,
        AddReportsComponent

    ],
    imports: [ReportsRoutingModule,SharedModule],
    providers: [
        ReportService,

    ]
})
export class ReportsModule { }