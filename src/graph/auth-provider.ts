import { AuthenticationProvider } from '@microsoft/microsoft-graph-client';
import * as MSALAuthenticationProvider from '@microsoft/microsoft-graph-client/lib/es/browser/ImplicitMSALAuthenticationProvider';

export let authProvider: AuthenticationProvider;

export const getAuthProvider = (userAgentApplication, scopes) => {
  console.log('getAuthProvider');
  authProvider = new MSALAuthenticationProvider.ImplicitMSALAuthenticationProvider(
    userAgentApplication,
    {
      scopes
    }
  );
};
