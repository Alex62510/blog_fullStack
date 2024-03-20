import {errorHandler} from "../utils/error.js";
import Comment from "../models/comment.model.js";

export const createComment = async (req, res, next) => {
    try {
        const {postId, userId, content} = req.body
        if (userId !== req.user.id) {
            return next(errorHandler(403, 'You are not allowed to create this comment'))
        }
        if(!content){
            return next(errorHandler(403,"You have to write content"))
        }
        const newComment = new Comment({
            content,
            postId,
            userId
        })
        await newComment.save()
        res.status(200).json(newComment)
    } catch (e) {
        next(e)
    }
}

export const getPostComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({postId: req.params.postId}).sort({
            createdAt: -1
        })
        res.status(200).json(comments)
    } catch (e) {
        next(e)
    }
}
export const likeComments = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId)
        if (!comment) {
            return next(errorHandler(404, 'Comment not found'))
        }
        const userIndex = comment.likes.indexOf(req.user.id)
        if (userIndex === -1) {
            comment.numberOfLikes += 1
            comment.likes.push(req.user.id)
        } else {
            comment.numberOfLikes -= 1
            comment.likes.splice(userIndex, 1)
        }
        await comment.save()
        res.status(200).json(comment)
    } catch (e) {
        next(e)
    }
}

export const editComments = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId)
        if (!comment) {
            return next(errorHandler(404, 'Comment not found'))
        }
        if (comment.userId !== req.user.id && req.user.isAdmin === false) {
            return next(errorHandler(404, 'You are not allowed to edit this comment!'))
        }
        const editedComment=await Comment.findByIdAndUpdate(req.params.commentId,{
            content: req.body.content,
        },{new:true})
        res.status(200).json(editedComment)
    } catch (e) {
        next(e)
    }
}

export const deleteComments= async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.commentId)
        if (!comment) {
            return next(errorHandler(404, 'Comment not found'))
        }
        if (comment.userId !== req.user.id && req.user.isAdmin === false) {
            return next(errorHandler(404, 'You are not allowed to edit this comment!'))
        }
        await Comment.findByIdAndDelete(req.params.commentId)
        res.status(200).json('Comment has been deleted')
    }catch (e) {
        next(e)
    }
}