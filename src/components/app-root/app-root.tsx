import { Component, h } from '@stencil/core';

// import * as GraphTypes from "@microsoft/microsoft-graph-types"

// import { Client } from "@microsoft/microsoft-graph-client";

import { getLogin } from '../../auth';

import { getMsalInstance, msalInstance } from '../../auth';
import { getAuthProvider, authProvider } from '../../graph';
import { getGraphCLient } from '../../graph/client';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true
})
export class AppRoot {
  componentWillLoad() {
    // It's required to do this here: https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/174
    getMsalInstance();
  }

  async handleLogin() {
    console.log('handleLogin');
    await getLogin();

    const graphScopes = ['User.Read', 'Mail.Send']; // An array of graph scopes
    getAuthProvider(msalInstance, graphScopes);
    console.log('AuthProvider', authProvider);

    const graphClient = getGraphCLient();
    console.log('graphClient', graphClient);

    try {
      let userDetails = await graphClient.api('/me').get();
      console.log(userDetails);
    } catch (error) {
      throw error;
    }
  }

  render() {
    return (
      <div>
        <header>
          <h1>Stencil App Starter</h1>
        </header>

        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="app-home" exact={true} />
              <stencil-route url="/profile/:name" component="app-profile" />
            </stencil-route-switch>
          </stencil-router>

          <button onClick={() => this.handleLogin()}>Login</button>
        </main>
      </div>
    );
  }
}