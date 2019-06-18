import { Component, h } from '@stencil/core';

// import { Client } from "@microsoft/microsoft-graph-client";

import { getLogin } from '../../auth';

import { getMsalInstance } from '../../auth';

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

  handleLogin() {
    console.log('handleLogin');
    getLogin();
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
