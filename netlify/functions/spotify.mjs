import express, { Router } from "express"
import serverless from "serverless-http"
import querystring from "query-string"
import cors from "cors"
import path from "path"
import request from "request"

const api = express()
const router = Router()

const PORT = process.env.PORT || 8888
const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET
let redirect_uri = process.env.REDIRECT_URI || 'http://localhost:5173/callback'
let frontend_uri = process.env.FRONTEND_URI || 'http://localhost:5173'

if (process.env.NODE_ENV !== 'production') {
  redirect_uri = 'http://localhost:5173/callback'
  frontend_uri = 'http://localhost:5173'
}

if (process.env.NODE_ENV !== 'production') {
  api.use(express.static(path.resolve(__dirname, '../client'))).use(cors())
}

// Handle prdouction
if (process.env.NODE_ENV === 'production') {
  // Static folder
  api.use(express.static(path.resolve(__dirname + '/public/')))

  // Handle SPA
  api.get('/', (req, res) => res.sendFile(path.resolve(__dirname + '/public/index.html')))
}

const generateRandomString = function (length) {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

router.get('/login', function (req, res) {

  let state = generateRandomString(16)
  const scope = 'user-read-email user-top-read user-follow-read playlist-read-private playlist-read-collaborative'

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }))
})

router.get('/callback', function (req, res) {

  let code = req.query.code || null
  let state = req.query.state || null

  if (state === null) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }))
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
    }

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {

        const access_token = body.access_token,
          refresh_token = body.refresh_token

        // we can also pass the token to the browser to make requests from there
        res.redirect(
          `${frontend_uri}/#${querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token,
          })}`
        )
      } else {
        res.redirect(`/#${querystring.stringify({ error: 'invalid_token' })}`)
      }
    })
  }
})

router.get('/refresh_token', function (req, res) {

  const refresh_token = req.query.refresh_token
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  }

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token
      res.send({
        'access_token': access_token
      })
    }
  })
})

api.listen(PORT, function () {
  console.warn(`Node cluster worker ${process.pid}: listening on port ${PORT}`)
})

api.use("/spotify/", router)

export const handler = serverless(api)