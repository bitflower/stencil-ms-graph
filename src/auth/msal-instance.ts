import * as Msal from 'msal';

export let msalInstance;

export const getMsalInstance = () => {
  console.log('getMsalInstance');
  var msalConfig: Msal.Configuration = {
    auth: {
      clientId: '8abbcccf-512f-44ba-9c9b-a415cb267110'
      //   redirectUri: location.origin
      //   navigateToLoginRequestUrl: true
      //   authority: 'https://login.microsoftonline.com/Enter_the_Tenant_Info_Here'
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: true
    }
  };

  msalInstance = new Msal.UserAgentApplication(msalConfig);

  msalInstance.handleRedirectCallback((error, response) => {
    // handle redirect response or error
    console.log('blub', error, response);
  });

  // Check if the user can be retrieved and automatically get your data
  //   if (msalInstance.getUser()) {
  //     this._getAccessToken();
  //   }

  //   msalInstance.loginPopup().then((idToken: Msal.AuthResponse) => {
  //     console.log('logined', idToken);
  //     this._getAccessToken();
  //   });

  console.log('Msal.UserAgentApplication', msalInstance);

  return msalInstance;
};
