import express from 'express'
import { verifyToken } from '../utils/verifyUser.js'
import { create, getPost } from '../controller/post.controller.js'

const router = express.Router()

router.post('/create-post', verifyToken, create)
router.get('/get-post', getPost)

export default router