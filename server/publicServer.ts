import * as express from 'express';
import {Application} from 'express';

const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const morgan = require('morgan');
// This line is from the Node.js HTTPS documentation.
const options = {
  key: fs.readFileSync('./server/private.key'),
  cert: fs.readFileSync('./server/domain.crt')
};

// Create a service (the app object is just a callback).
const app: Application = express();
app.use(morgan('combined'));
app.use(express.static('./dist'));

// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(4200, 'localhost');
// app.listen(4200);
