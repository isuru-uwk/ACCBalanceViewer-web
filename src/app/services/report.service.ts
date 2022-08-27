import { ReportViewModel } from './../components/shared/models/report.model';
import { BaseService } from './base.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReportService extends BaseService {
  constructor(private http: HttpClient, protected _snackBar: MatSnackBar) {
    super(_snackBar);
  }

  getCumulativeReport$(month: number, year: number): Observable<ReportViewModel> {
    return this.http.get<ReportViewModel>(this.requestUri + `/api/reports/cumulative/${year}/${month}`, this.requestHeaders).pipe(
      catchError((error, caught) => {
        return this.handleError(error, () => caught);
      })
    );
  }

  addReport$<T>(year: number, month: number, file: File): Observable<T> {
    const formData: FormData = new FormData();
    formData.append('year', year.toString());
    formData.append('month', month.toString());
    formData.append('file', file);

    return this.http.post<T>(this.requestUri + "/api/reports/add", formData).pipe(
      catchError((error, caught) => {
        return this.handleError(error, () => caught);
      })
    );
  }
}