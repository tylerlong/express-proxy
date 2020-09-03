import express from 'express';
import proxy from 'express-http-proxy';

const app = express();
app.use('/microsoft', proxy('https://login.microsoftonline.com'));

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
