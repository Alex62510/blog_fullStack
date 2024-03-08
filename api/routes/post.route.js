import express from 'express'
import {verifyToken} from "../utils/verifyUser.js";
import {createPost, getPosts,deletePosts} from "../controllers/post.controllers.js";

const router = express.Router()

router.post('/create', verifyToken, createPost)
router.get('/getposts', getPosts)
router.delete('/deletepost/:postId/:userId',verifyToken, deletePosts)

export default router