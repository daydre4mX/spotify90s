// routes/createUser.js
import express from 'express'
import supabase from './supabaseClient.js'

const router = express.Router()

router.post('/create-user', async (req, res) => {
  const { id, spotify_id, display_name, email, avatar_url } = req.body

  const { data, error } = await supabase
    .from('users')
    .insert([{ id, spotify_id, display_name, email, avatar_url }])

    if (error) return res.status(400).json({ error: error.message })
  res.json({ user: data })
})

export default router
