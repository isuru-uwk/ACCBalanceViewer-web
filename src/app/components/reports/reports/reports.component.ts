import { Months } from './../../shared/models/constants.model';
import { ReportViewModel } from './../../shared/models/report.model';
import { LookupValue } from './../../shared/models/lookup-value.model';
import { ReportService } from './../../../services/report.service';
import { Component, OnInit } from '@angular/core';
import { Years } from '../../shared/models/constants.model';

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

  ngOnInit(): void {

    this.getReport();
  }

  getReport(): void {
    this.reportService.getCumulativeReport$(this.selectedMonth, this.selectedYear)
      .subscribe((result: ReportViewModel) => {
        this.report = result;
      });

  }

}
