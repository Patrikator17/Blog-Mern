import express from 'express'
const router = express.Router()
import { deleteUser,    getUsers,  signout, test, updateUser } from '../controller/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js'


router.get('/test', test)
router.put('/update/:userId', verifyToken, updateUser)
router.delete('/delete/:userId', verifyToken, deleteUser)
router.post('/signout', signout)
router.get('/get-users', verifyToken, getUsers )



export default router