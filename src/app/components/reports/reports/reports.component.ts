import { Months } from './../../shared/models/constants.model';
import { ReportViewModel } from './../../shared/models/report.model';
import { LookupValue } from './../../shared/models/lookup-value.model';
import { ReportService } from './../../../services/report.service';
import { Component, OnInit } from '@angular/core';
import { Years } from '../../shared/models/constants.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(private reportService: ReportService) { }

  months = Months;
  years = Years;

  report: ReportViewModel;

  selectedYear: number = 2022;
  selectedMonth: number = 8;

  isLoading = false;

  ngOnInit(): void {

    this.getReport();
  }

  getCurrentReportDate(){
    let month = this.months.filter(m=>m.id == this.selectedMonth)[0].label;
    let year = this.selectedYear.toString();

    return `Balances as of ${month} ${year}`

  }

  getReport(): void {
    this.isLoading= true;
    this.reportService.getCumulativeReport$(this.selectedMonth, this.selectedYear).pipe(finalize(() => (this.isLoading = false)))
      .subscribe((result: ReportViewModel) => {
        this.report = result;
      });

  }

}
