import { MsalService } from '@azure/msal-angular';
import { Component } from '@angular/core';
import { AccountInfo } from '@azure/msal-browser';
import { environment } from 'src/environments/environment';

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
    this.msalService.instance.logoutRedirect({postLogoutRedirectUri:environment.adconfig.postLogoutRedirectUri}); 
  }
}
