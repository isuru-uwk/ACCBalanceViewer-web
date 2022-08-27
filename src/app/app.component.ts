import { MsalService } from '@azure/msal-angular';
import { Component } from '@angular/core';
import { AccountInfo } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Account-Balance-Viewer';
  /**
   *
   */
  constructor(private msalService: MsalService) {
  }

  ngOnInit(): void {
  }

  getUserName(): String {
    var user = this.msalService.instance.getAllAccounts()[0];
    return user?.name ?? ""
  }

  logout(): void {
    this.msalService.instance.logout();
  }
}
