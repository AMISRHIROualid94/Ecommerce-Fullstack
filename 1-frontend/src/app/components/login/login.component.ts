import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import * as OktaSignIn from '@okta/okta-signin-widget';
import myConfigApp from 'src/app/config/my-config-app';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit  {
  oktaSignin: any;

  constructor(private oktaAuthService: OktaAuthService) { 

    this.oktaSignin = new OktaSignIn({
      logo: 'assets/Logo.png',
      baseUrl: myConfigApp.oidc.issuer.split('/oauth2')[0],
      clientId: myConfigApp.oidc.clientId,
      redirectUri: myConfigApp.oidc.redirectUri,
      features:{
        registration : true
      },
      authParams: {
        pkce: true,
        issuer: myConfigApp.oidc.issuer,
        scopes: myConfigApp.oidc.scopes
      }
    });

  }

  ngOnInit(): void {
    this.oktaSignin.remove();

    this.oktaSignin.renderEl({
      el: '#okta-sign-in-widget'}, // this name should be same as div tag id in login.component.html
      (response) => {
        if (response.status === 'SUCCESS') {
          this.oktaAuthService.signInWithRedirect();
        }
      },
      (error) => {
        throw error;
      }
    );
  }


}
