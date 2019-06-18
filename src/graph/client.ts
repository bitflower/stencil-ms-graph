import * as EsClient from '@microsoft/microsoft-graph-client/lib/es/Client';
// import { Client } from '@microsoft/microsoft-graph-client';

import { authProvider } from './auth-provider';
import { ClientOptions } from '@microsoft/microsoft-graph-client/lib/es/IClientOptions';

let graphClient: EsClient.Client;

export const getGraphClient = (): EsClient.Client => {
  console.log('getGraphCLient');

  const options: ClientOptions = {
    authProvider,
    debugLogging: true
    // defaultVersion: 'v2.0'
  };
  //   const Client = Client.Client;
  graphClient = EsClient.Client.initWithMiddleware(options);

  return graphClient;
};
