import express from 'express'
import supabase from '../supabaseClient.js'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

router.post('/refresh-token', async (req, res) => {
  const { user_id } = req.body

  const { data: session, error } = await supabase
    .from('sessions')
    .select('refresh_token')
    .eq('user_id', user_id)
    .single()

  if (error || !session) {
    return res.status(404).json({ error: 'Refresh token not found' })
  }

  try {
    const params = new URLSearchParams()
    params.append('grant_type', 'refresh_token')
    params.append('refresh_token', session.refresh_token)
    params.append('client_id', process.env.SPOTIFY_CLIENT_ID)
    params.append('client_secret', process.env.SPOTIFY_CLIENT_SECRET)

    const { data } = await axios.post(
      'https://accounts.spotify.com/api/token',
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )

    // Optional: Update access_token in Supabase
    await supabase
      .from('sessions')
      .update({ access_token: data.access_token })
      .eq('user_id', user_id)

    res.json({ access_token: data.access_token })
  } catch (err) {
    console.error(' Spotify refresh error:', err.response?.data || err.message)
    res.status(400).json({ error: 'Token refresh failed' })
  }
})

export default router
