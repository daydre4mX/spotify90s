import express from 'express'
import dotenv from 'dotenv'
import createUserRoute from './routes/createUser.js'
import getTokensRoute from './routes/getTokens.js'
import saveSessionRoute from './routes/saveSession.js'
import refreshTokenRoute from './routes/refreshToken.js'
import meRoute from './routes/me.js'
import playRoute from './routes/play.js'
import pauseRoute from './routes/pause.js'
import currentTrackRoute from './routes/currentTrack.js'
import playlistsRoute from './routes/playlists.js'
import devicesRoute from './routes/devices.js'
import skipRoute from './routes/skip.js'
import previousRoute from './routes/previous.js'
import getUserRoute from './routes/getUser.js'





dotenv.config()

const app = express()
app.use(express.json())

app.use('/api', createUserRoute)
app.use('/api', getTokensRoute)
app.use('/api', saveSessionRoute)
app.use('/api', refreshTokenRoute)
app.use('/api', meRoute)
app.use('/api', playRoute)
app.use('/api', pauseRoute)
app.use('/api', currentTrackRoute)
app.use('/api', playlistsRoute)
app.use('/api', devicesRoute)
app.use('/api', skipRoute)
app.use('/api', previousRoute)
app.use('/api', getUserRoute)




app.get('/login', (req, res) => {
  const supabaseUrl = 'https://rsefoylaydzicunemdvf.supabase.co'

  const scopes = [
    'user-read-email',
    'user-read-private',
    'user-read-playback-state',
    'user-modify-playback-state',
    'playlist-read-private',
    'streaming'
  ].join(' ')

  const redirectUrl = `${supabaseUrl}/auth/v1/authorize?provider=spotify&scopes=${encodeURIComponent(scopes)}&show_dialog=true`


  res.redirect(redirectUrl)
})


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
