import express from 'express'
import {verifyToken} from "../utils/verifyUser.js";
import {
    createPost,
    getPosts,
    deletePosts,
    updatePosts
} from "../controllers/post.controllers.js";

const router = express.Router()

router.post('/create', verifyToken, createPost)
router.get('/getposts', getPosts)
router.delete('/deletepost/:postId/:userId', verifyToken, deletePosts)
router.put('/updatepost/:postId/:userId', verifyToken, updatePosts)

export default router