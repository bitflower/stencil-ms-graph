import * as Msal from 'msal';

export let msalInstance: Msal.UserAgentApplication;

export const getMsalInstance = () => {
  console.log('getMsalInstance');
  var msalConfig: Msal.Configuration = {
    auth: {
      clientId: '8abbcccf-512f-44ba-9c9b-a415cb267110'
      // redirectUri: location.origin
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

  console.log('Msal.UserAgentApplication', msalInstance);

  return msalInstance;
};
