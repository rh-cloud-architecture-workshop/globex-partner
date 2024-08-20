import 'zone.js/node';

import { APP_BASE_HREF } from '@angular/common';
import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { existsSync } from 'fs';
import { join } from 'path';
import { get } from 'env-var';
import { AppServerModule } from './src/main.server';
import { PaginatedProductsList } from 'src/app/models/product.model';
import * as qs from 'qs';

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/globex-partner-web/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';
  const axios = require('axios');


  const ANGULR_API_GETPAGINATEDPRODUCTS = '/api/getPaginatedProducts';
  const GLOBEX_PARTNER_GATEWAY = get('GLOBEX_PARTNER_GATEWAY').asString();


  const session = require('express-session');

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/main/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
    inlineCriticalCss: false,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));


  const apim_client_id = get("API_CLIENT_ID").asString(); // Your client id
  const apim_client_secret = get("API_CLIENT_SECRET").asString(); // Your secret
  const apimTokenURL = get("API_TOKEN_URL").asString(); // Your secret

  const auth_token = Buffer.from(`${apim_client_id}:${apim_client_secret}`, 'utf-8').toString('base64');

  const getAuth = async () => {
    try {
      //make post request to SPOTIFY API for access token, sending relavent info
      const token_url = apimTokenURL;
      const data = qs.stringify({ 'grant_type': 'client_credentials' });

      const response = await axios.post(token_url, data, {
        headers: {
          'Authorization': `Basic ${auth_token}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      //return access token
      return response.data.access_token;
    } catch (error) {
      //on fail, log the error in console
      console.log(error);
    }
  }


  server.get(ANGULR_API_GETPAGINATEDPRODUCTS, async (req, res) => {
    var getProducts: PaginatedProductsList;
    var myTimestamp = new Date().getTime().toString();
    var url = GLOBEX_PARTNER_GATEWAY + "/partners/services/product";
    var limit = req.query['limit'];
    var page = req.query['page'];

    const token = await getAuth();
    const config = {
      headers: { Authorization: `Bearer ${token}` },
      params: { limit: limit, timestamp: myTimestamp, page: page }
    };
    axios.get(url, config,)
      .then(response => {
        getProducts = response.data;;
        res.send(getProducts);
      })
      .catch(error => {
        console.log("ANGULR_API_GETCATEGORIES", error.response);
        res.status(error.response.status).send();
      });
  });


  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
