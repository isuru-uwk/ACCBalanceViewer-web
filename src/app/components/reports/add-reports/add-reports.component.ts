import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ReportService } from 'src/app/services/report.service';
import { Months, Years } from '../../shared/models/constants.model';

@Component({
  selector: 'app-add-reports',
  templateUrl: './add-reports.component.html',
  styleUrls: ['./add-reports.component.css']
})

export class AddReportsComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private reportService: ReportService,private snackBar:MatSnackBar) { }

  isValidFile = true;

  selectedYear: number = 2022;
  selectedMonth: number = 8;

  reportForm: any;
  formData: FormData;
  file: File;

  months = Months;
  years = Years;


  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.reportForm = this.formBuilder.group({
      month: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      file: new FormControl('', [Validators.required])
    });
    this.formData = new FormData();
  }

  onFileSelected(event: any) {

    this.file = event.target.files[0];

    if (this.file) {

      if (this.file.type == "text/plain" ||
        this.file.type == "application/vnd.ms-excel" ||
        this.file.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {

        this.isValidFile = true;
      } else {

        this.isValidFile = false;
      }

    }
  }


  addReport(): void {
    if (!this.reportForm.valid) return;

    let month: number = this.reportForm.get('month').value;
    let year: number = this.reportForm.get('year').value;

    this.reportService.addReport$(year, month, this.file).subscribe(res => {
      this.snackBar.open("Report added successfully!" , "Success");
      
    })
  }

}
