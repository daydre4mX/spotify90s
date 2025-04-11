// routes/getTokens.js
import express from 'express'
import supabase from '../supabaseClient.js'

const router = express.Router()

router.get('/get-tokens', async (req, res) => {
  const { user_id } = req.query

  const { data, error } = await supabase
    .from('sessions')
    .select('access_token, refresh_token, expires_at')
    .eq('user_id', user_id)
    .single()

  if (error || !data) {
    console.error('Token fetch error:', error?.message || 'No session found')
    return res.status(404).json({ error: 'Session not found' })
  }

  res.json({
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: data.expires_at
  })
})

export default router
