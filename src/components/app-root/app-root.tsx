import { Component, h, State } from '@stencil/core';

// import * as GraphTypes from "@microsoft/microsoft-graph-types"
import { getLogin, getMsalInstance, msalInstance } from '../../auth';
import { getAuthProvider, authProvider } from '../../graph';
import { getGraphClient } from '../../graph/client';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true
})
export class AppRoot {
  @State()
  private graphClient;

  componentWillLoad() {
    // It's required to do this here: https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/174
    getMsalInstance();
  }

  async handleLogin() {
    console.log('handleLogin');
    const graphScopes = ['User.Read', 'Files.Read.All', 'Directory.Read.All']; //, 'mail.send']; // An array of graph scopes

    await getLogin(graphScopes);

    getAuthProvider(msalInstance, graphScopes);
    console.log('AuthProvider', authProvider);

    this.graphClient = getGraphClient();
    console.log('graphClient', this.graphClient);
  }

  async readFolders() {
    console.log('readFolders');

    // try {
    //   console.log('Reading user');
    //   let userDetails = await graphClient.api('/me').get();
    //   console.log(userDetails);
    // } catch (error) {
    //   throw error;
    // }

    try {
      let res = await this.graphClient
        .api(`/me/drive/root`)
        // .responseType(MicrosoftGraph.ResponseType.BLOB)
        .get();
      console.log(res);
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
          {this.graphClient ? (
            <button onClick={() => this.readFolders()}>Read Folders</button>
          ) : null}
        </main>
      </div>
    );
  }
}
