import express from 'express'
import {verifyToken} from "../utils/verifyUser.js";
import {
    createComment,
    getPostComments,
    likeComments,
    editComments,
    deleteComments
} from "../controllers/comment.controller.js";

const router = express.Router()

router.post('/create', verifyToken, createComment)
router.get('/getPostComments/:postId', getPostComments)
router.put('/likeComments/:commentId', verifyToken, likeComments)
router.put('/editComments/:commentId', verifyToken, editComments)
router.delete('/deleteComments/:commentId', verifyToken, deleteComments)


export default router