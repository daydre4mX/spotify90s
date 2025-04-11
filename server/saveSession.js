// routes/saveSession.js
import express from 'express'
import supabase from '../supabaseClient.js'

const router = express.Router()

router.post('/save-session', async (req, res) => {
  const { user_id, access_token, refresh_token, expires_at } = req.body

  const { data, error } = await supabase
    .from('sessions')
    .upsert(
      [
        {
          user_id,
          access_token,
          refresh_token,
          expires_at
        }
      ],
      { onConflict: 'user_id' } 
    )
    .select() 
  if (error) {
    console.error('Save session error:', error)
    return res.status(400).json({ error: error.message })
  }

  res.json({ message: 'Session saved', session: data })
})

export default router
