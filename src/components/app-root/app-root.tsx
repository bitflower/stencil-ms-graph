import { Component, h, State } from '@stencil/core';
import { Client } from '@microsoft/microsoft-graph-client/lib/src/Client';

import printJS from 'print-js';

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
  private graphClient: Client;

  @State()
  public rootFolders: any[];

  protected token: string;

  componentWillLoad() {
    // It's required to do this here: https://github.com/AzureAD/microsoft-authentication-library-for-js/issues/174
    getMsalInstance();
  }

  async handleLogin() {
    console.log('handleLogin');
    const graphScopes = ['User.Read', 'Files.Read.All', 'Directory.Read.All']; //, 'mail.send']; // An array of graph scopes

    this.token = await getLogin(graphScopes);

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
        // .api(`/me/drive/root:/Kunden:/children`)
        .api(
          `/me/drive/root:/Kunden/99997%20Belliconias%20AG%20Deutschland/Berlin%20Zentrale/VDKA%201:/children`
        )
        // .responseType(MicrosoftGraph.ResponseType.BLOB)
        .get();
      console.log(res);
      this.rootFolders = res.value;
    } catch (error) {
      throw error;
    }
  }

  async printFiles() {
    console.log('printFiles');

    // this.rootFolders.forEach((folder: any) => {
    //   console.log(
    //     `Folder: ${folder.name}`,
    //     folder[`@microsoft.graph.downloadUrl`]
    //   );
    // });

    // printJS({
    //   printable: this.rootFolders[0][`@microsoft.graph.downloadUrl`],
    //   type: 'json'
    // });

    const format: string = 'pdf';
    const pdfUrl: string = `/me/drive/items/${
      this.rootFolders[0].id
    }/content?format=${format}`;
    console.log('pdfUrl', pdfUrl);

    try {
      let res = await this.graphClient
        .api(pdfUrl)
        .option('redirect', 'follow')
        .get();

      console.log('BLUB', res);

      // this.rootFolders = res.value;
    } catch (error) {
      // Extract PDF URL
      console.log('GOT IT!', error);
      throw error;
    }
  }

  protected filesToPrint: string[] = [];
  async printSamplePDF() {
    console.log('printSamplePDF');

    const pdfFile: string = 'https://printjs.crabbly.com/docs/printjs.pdf';

    this.filesToPrint = [pdfFile, pdfFile];

    this.printNextFile();
  }

  private printNextFile() {
    console.log('File printed');

    if (this.filesToPrint.length > 0) {
      printJS({
        printable: this.filesToPrint[0],
        // type: 'pdf',
        // showModal: true,
        // modalMessage: 'Retrieving document from external server...',
        onPrintDialogClose: this.printNextFile.bind(this)
      });
    }

    this.filesToPrint.splice(0, 1);

    console.log('count', this.filesToPrint);
  }

  render() {
    return (
      <div>
        <header>
          <h1>Dr. Hartmann Tagebücher Portal</h1>
        </header>

        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url="/" component="app-home" exact={true} />
              <stencil-route url="/profile/:name" component="app-profile" />
            </stencil-route-switch>
          </stencil-router>

          <div class="padding">
            <button onClick={() => this.handleLogin()}>Login</button>
            {this.graphClient ? (
              <button onClick={() => this.readFolders()}>
                Verzeichnisse lesen
              </button>
            ) : null}

            <h2>Gefundene Ordner</h2>
            <ul>
              {this.rootFolders
                ? this.rootFolders.map((folder: any) => (
                    <li>
                      <a href={folder.webUrl} target="_blank">
                        {folder.name}
                      </a>{' '}
                      |{' '}
                      <a href={folder[`@microsoft.graph.downloadUrl`]}>
                        Download
                      </a>
                      <br />
                      (Pfad:{' '}
                      <i>
                        {folder.parentReference.path.split('%20').join(' ')}
                      </i>
                      )
                    </li>
                  ))
                : null}
            </ul>
            {this.rootFolders ? (
              <button onClick={() => this.printFiles()}>Dateien drucken</button>
            ) : null}
            <button onClick={() => this.printSamplePDF()}>
              2 Beispiel PDFs drucken
            </button>
          </div>
        </main>
      </div>
    );
  }
}
