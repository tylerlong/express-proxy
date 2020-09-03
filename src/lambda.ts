import serverlessHTTP from 'serverless-http';

import expressApp from './index';

export const app = serverlessHTTP(expressApp);
