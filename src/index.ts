import express from 'express';
import proxy from 'express-http-proxy';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(
  '/microsoft',
  proxy('https://login.microsoftonline.com', {
    proxyReqBodyDecorator: function (bodyContent) {
      if (bodyContent.client_secret === undefined) {
        bodyContent.client_secret = process.env.MICROSOFT_CLIENT_SECRET;
      }
      return bodyContent;
    },
  })
);

export default app;
