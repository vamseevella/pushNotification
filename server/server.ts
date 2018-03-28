import * as express from 'express';
import {Application} from 'express';

const https = require('https');
const fs = require('fs');
import {readAllLessons} from './read-all-lessons.route';
import {addPushSubscriber} from './add-push-subscriber.route';
import {sendNewsletter} from './send-newsletter.route';

const bodyParser = require('body-parser');
const morgan = require('morgan');
const webpush = require('web-push');

const vapidKeys = {
  'publicKey': 'BLnVk1MBGFBW4UxL44fuoM2xxQ4o9CuxocVzKn9UVmnXZEyPCTEFjI4sALMB8qN5ee67yZ6MeQWjd5iyS8lINAg',
  'privateKey': 'mp5xYHWtRTyCA63nZMvmJ_qmYO6A1klSotcoppSx-MI'
};

// This line is from the Node.js HTTPS documentation.
const options = {
  key: fs.readFileSync('./server/private.key'),
  cert: fs.readFileSync('./server/domain.crt')
};


webpush.setVapidDetails(
  'mailto:vellavamsikumar@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);


const app: Application = express();
const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
};

app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


// REST API
app.route('/api/lessons')
  .get(readAllLessons);

app.route('/api/notifications')
  .post(addPushSubscriber);

app.route('/api/newsletter')
  .post(sendNewsletter);


// launch an HTTP Server
// const httpServer = app.listen(9000, 'localhost', () => {
//   console.log('HTTP Server running at http://localhost:' + httpServer.address().port);
// });
// Create an HTTPS service identical to the HTTP service.
https.createServer(options, app).listen(9000, 'localhost');









