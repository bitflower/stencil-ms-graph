import { AuthenticationProvider } from '@microsoft/microsoft-graph-client';
import { ImplicitMSALAuthenticationProvider } from '@microsoft/microsoft-graph-client/lib/src/ImplicitMSALAuthenticationProvider';

export let authProvider: AuthenticationProvider;

export const getAuthProvider = (userAgentApplication, scopes) => {
  console.log('getAuthProvider');
  authProvider = new ImplicitMSALAuthenticationProvider(userAgentApplication, {
    scopes
  });
};
