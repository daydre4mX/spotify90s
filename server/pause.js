// pause.js
import express from 'express'
import supabase from '../supabaseClient.js'
import axios from 'axios'

const router = express.Router()

router.post('/pause', async (req, res) => {
  const { user_id } = req.body

  const { data: session } = await supabase
    .from('sessions')
    .select('access_token')
    .eq('user_id', user_id)
    .single()

  try {
    await axios.put('https://api.spotify.com/v1/me/player/pause', {}, {
      headers: {
        Authorization: `Bearer ${session.access_token}`
      }
    })

    res.json({ message: 'Playback paused' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

export default router
