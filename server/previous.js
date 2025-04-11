import express from 'express'
import supabase from '../supabaseClient.js'
import axios from 'axios'

const router = express.Router()

router.post('/previous', async (req, res) => {
  const { user_id } = req.body

  const { data: session } = await supabase
    .from('sessions')
    .select('access_token')
    .eq('user_id', user_id)
    .single()

  if (!session) return res.status(404).json({ error: 'Session not found' })

  try {
    await axios.post('https://api.spotify.com/v1/me/player/previous', {}, {
      headers: {
        Authorization: `Bearer ${session.access_token}`
      }
    })

    res.json({ message: 'Skipped to previous track' })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

export default router
