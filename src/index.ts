import express from 'express';
import proxy from 'express-http-proxy';
import cors from 'cors';
import bodyParser from 'body-parser';
import {google} from 'googleapis';

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

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

type GoogleAuthOptions = {
  clientEmail: string;
  privateKey: string;
  subjectEmail: string;
};
const getGoogleAuth = (options: GoogleAuthOptions) => {
  return new google.auth.GoogleAuth({
    scopes: [
      'https://www.googleapis.com/auth/admin.directory.user',
      'https://www.googleapis.com/auth/calendar',
    ],
    credentials: {
      client_email: options.clientEmail,
      private_key: options.privateKey,
    },
    clientOptions: {subject: options.subjectEmail},
  });
};
app.post('/google/list-users', async (req, res) => {
  const r = await google
    .admin({
      version: 'directory_v1',
      auth: getGoogleAuth(req.body),
    })
    .users.list({
      customer: 'my_customer',
    });
  return res.json(r.data);
});

export default app;
