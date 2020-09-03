import express from 'express';
import proxy from 'express-http-proxy';
import cors from 'cors';

const app = express();
app.use(cors());
app.use('/microsoft', proxy('https://login.microsoftonline.com'));

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
