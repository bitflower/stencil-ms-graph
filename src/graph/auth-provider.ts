// import * as Msal from 'msal';
import { AuthenticationProvider } from '@microsoft/microsoft-graph-client';
import * as MSALAuthenticationProvider from '@microsoft/microsoft-graph-client/lib/es/browser/MSALAuthenticationProvider';

export let authProvider: AuthenticationProvider;

export const getAuthProvider = (userAgentApplication, graphScopes) => {
  console.log('getAuthProvider');
  authProvider = new MSALAuthenticationProvider.MSALAuthenticationProvider(
    userAgentApplication,
    graphScopes
  );
};
