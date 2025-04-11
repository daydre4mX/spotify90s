// routes/getUser.js
import express from 'express'
import supabase from '../supabaseClient.js'

const router = express.Router()

router.get('/user/:id', async (req, res) => {
  const { id } = req.params

  const { data, error } = await supabase
    .from('users')
    .select()
    .eq('id', id)
    .single()

  if (error || !data) {
    console.error('❌ Error fetching user:', error?.message || 'User not found')
    return res.status(404).json({ error: 'User not found' })
  }

  res.json({ user: data })
})

export default router
