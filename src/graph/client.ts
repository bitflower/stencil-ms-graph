import * as EsClient from '@microsoft/microsoft-graph-client/lib/es/Client';
// import { Client } from '@microsoft/microsoft-graph-client';

import { authProvider } from './auth-provider';
import { ClientOptions } from '@microsoft/microsoft-graph-client/lib/es/IClientOptions';

let graphClient: EsClient.Client;

export const getGraphCLient = (): EsClient.Client => {
  console.log('getGraphCLient');

  const options: ClientOptions = {
    authProvider
  };
  //   const Client = Client.Client;
  graphClient = EsClient.Client.initWithMiddleware(options);

  return graphClient;
};
