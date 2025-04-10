// server.js
import express from 'express'
import dotenv from 'dotenv'
import createUserRoute from './routes/createUser.js'

dotenv.config()

const app = express()
app.use(express.json()) 


app.use('/api', createUserRoute)

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
      
      
  
    const redirectUrl = `${supabaseUrl}/auth/v1/authorize?provider=spotify&scopes=${encodeURIComponent(scopes)}`
  
    res.redirect(redirectUrl)
  })
  
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
