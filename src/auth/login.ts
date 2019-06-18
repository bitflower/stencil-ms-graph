import * as Msal from 'msal';

import { msalInstance } from './msal-instance';

export const getLogin: Function = async scopes => {
  console.log('getLogin');

  const authPars: Msal.AuthenticationParameters = {
    scopes: scopes
    // sid: '8abbcccf-512f-44ba-9c9b-a415cb267110'
  }; // ['User.Read', 'Mail.Read'];
  //   msalInstance.acquireTokenPopup(authPars).then(
  //     (token: Msal.AuthResponse) => {
  //       console.log('logined', token);
  //       // this._getCrntUser(token);
  //       // this._getMessages(token);
  //     },
  //     (err: string) => {
  //       // Something went wrong
  //       console.log('Error:', err);
  //       // this.setState({
  //       //   loading: false
  //       // });
  //     }
  //   );

  const token = await msalInstance.loginPopup(authPars);
  //   .then(
  //     (token: Msal.AuthResponse) => {
  //       console.log('logged in', token);
  //       // this._getCrntUser(token);
  //       // this._getMessages(token);
  //     },
  //     (err: string) => {
  //       // Something went wrong
  //       console.log('Error:', err);
  //       // this.setState({
  //       //   loading: false
  //       // });
  //     }
  //   );

  console.log('token', token);

  //   const authPars: Msal.AuthenticationParameters = {
  //     scopes: ['User.Read'] //, 'Mail.Read']
  //     // sid: '8abbcccf-512f-44ba-9c9b-a415cb267110'
  //   }; // ['User.Read', 'Mail.Read'];

  //   msalInstance.acquireTokenSilent(authPars).then(
  //     (token: Msal.AuthResponse) => {
  //       console.log('logined', token);
  //       //   this._getCrntUser(token);
  //       //   this._getMessages(token);
  //     },
  //     error => {
  //       // Interaction required
  //       if (error) {
  //         msalInstance.acquireTokenPopup(authPars).then(
  //           (token: Msal.AuthResponse) => {
  //             console.log('logined', token);
  //             // this._getCrntUser(token);
  //             // this._getMessages(token);
  //           },
  //           (err: string) => {
  //             // Something went wrong
  //             console.log('Error:', err);
  //             // this.setState({
  //             //   loading: false
  //             // });
  //           }
  //         );
  //       }
  //     }
  //   );

  return token;
};

// if (!this.userAgentApplication) {
//     this.userAgentApplication = new Msal.UserAgentApplication(
//         'clientID string', 'authority string or empty', this.authCallback, { cacheLocation: 'localStorage'});
// }
