// routes/me.js
import express from 'express'
import supabase from '../supabaseClient.js'
import axios from 'axios'

const router = express.Router()

router.get('/me', async (req, res) => {
  const { user_id } = req.query

  
  const { data: session, error } = await supabase
    .from('sessions')
    .select('access_token')
    .eq('user_id', user_id)
    .single()

  if (error || !session) {
    return res.status(404).json({ error: 'No session found' })
  }

  try {
    const { data } = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${session.access_token}`
      }
    })

    res.json(data)
  } catch (err) {
    console.error('Spotify API error:', err.response?.data || err.message)
    res.status(400).json({ error: 'Spotify API call failed' })
  }
})

export default router
