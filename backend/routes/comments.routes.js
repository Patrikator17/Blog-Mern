import express from 'express'
import { createComment, editComment, getComments, likeComment } from '../controller/comments.controller.js'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router()

router.post('/create', verifyToken, createComment)
router.get('/getPostComments/:postId', getComments)
router.put('/likeComment/:commentId', verifyToken,  likeComment)
router.put('/editComment/:commentId', verifyToken,  editComment)

export default router