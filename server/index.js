require('dotenv').config();

const express = require('express');
const querystring = require('querystring');
const cors = require('cors');
const path = require('path');
const request = require('request');
const PORT = process.env.PORT || 8888;

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
let redirect_uri = process.env.REDIRECT_URI || 'http://localhost:8888/callback';
let frontend_uri = process.env.FRONTEND_URI || 'http://127.0.0.1:5173';

if (process.env.NODE_ENV !== 'production') {
  redirect_uri = 'http://localhost:8888/callback';
  frontend_uri = 'http://127.0.0.1:5173';
}

const app = express();

if (process.env.NODE_ENV !== 'production') {
  app.use(express.static(path.resolve(__dirname, '../client'))).use(cors());
}

console.log(path.resolve(__dirname, '/public/'));

// Handle prdouction
if (process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static(path.resolve(__dirname + '/public/')));

  // Handle SPA
  app.get('/', (req, res) => res.sendFile(path.resolve(__dirname + '/public/index.html')));
}

const generateRandomString = function (length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

app.get('/login', function (req, res) {

  let state = generateRandomString(16);
  const scope = 'user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public';

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function (req, res) {

  let code = req.query.code || null;
  let state = req.query.state || null;

  if (state === null) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {

        const access_token = body.access_token,
          refresh_token = body.refresh_token;

        // we can also pass the token to the browser to make requests from there
        res.redirect(
          `${frontend_uri}/#${querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token,
          })}`
        );
      } else {
        res.redirect(`/#${querystring.stringify({ error: 'invalid_token' })}`);
      }
    });
  }
});

app.get('/refresh_token', function (req, res) {

  const refresh_token = req.query.refresh_token;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

// console.log('Listening on 8888');
app.listen(PORT, function () {
  console.warn(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
});