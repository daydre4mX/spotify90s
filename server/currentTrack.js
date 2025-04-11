import express from 'express'
import supabase from '../supabaseClient.js'
import axios from 'axios'

const router = express.Router()

router.get('/current-track', async (req, res) => {
  const { user_id } = req.query

  const { data: session } = await supabase
    .from('sessions')
    .select('access_token')
    .eq('user_id', user_id)
    .single()

  try {
    const { data } = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        Authorization: `Bearer ${session.access_token}`
      }
    })

    res.json(data)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

export default router
