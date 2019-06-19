import { Client } from '@microsoft/microsoft-graph-client/lib/src/Client';
import { ClientOptions } from '@microsoft/microsoft-graph-client/lib/src/IClientOptions';

import { authProvider } from './auth-provider';

let graphClient: Client;

export const getGraphClient = (): Client => {
  console.log('getGraphCLient');

  const options: ClientOptions = {
    authProvider,
    debugLogging: true
    // defaultVersion: 'v2.0'
  };
  //   const Client = Client.Client;
  graphClient = Client.initWithMiddleware(options);

  return graphClient;
};
