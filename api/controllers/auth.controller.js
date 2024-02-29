import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import {errorHandler} from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    const {username, email, password} = req.body
    if (!username || !email || !password || username === '' || email === '' || password === '') {
        next(errorHandler(400, "All field are required"))
    }
    const hashedPassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({username, email, password: hashedPassword})

    try {
        await newUser.save()
        res.status(201).json("Signup successful")
    } catch (e) {
        next(e)
    }
}

export const signin = async (req, res, next) => {
    const {email, password} = req.body
    if (!email || !password || email === '' || password === '') {
        next(errorHandler(400, 'All fields are required'))
    }
    try {
        const validUser = await User.findOne({email})
        if (!validUser) {
            return next(errorHandler(404, "User not found"))
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(400, 'Invalid password'));
        }
        const token = jwt.sign({
            id: validUser._id
        }, process.env.JWT_SECRET)

        const {password: pass, ...rest} = validUser._doc
        res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest)
    } catch (e) {
        next(e)
    }
}

export const google = async (req, res, next) => {
    const {email, name, googlePhotoUrl} = req.body
    try {
        const user = await User.findOne({email})
        if (user) {
            const token = jwt.sign({
                id: user._id
            }, process.env.JWT_SECRET)
            const {password: pass, ...rest} = user._doc
            res.status(200).cookie('access_token', token, {httpOnly: true}).json(rest)
        } else {
            const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
            const hashedPassword = bcryptjs.hashSync(randomPassword, 10)
            const newUser = new User({
                username: name.split(" ").join("").toLowerCase() + Math.floor(Math.random() * 10000).toString(),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl
            })
            newUser.save()
            const token = jwt.sign({
                id: newUser._id
            }, process.env.JWT_SECRET)
            const {password: pass, ...rest} = newUser._doc
            res.status(200).cookie('access_token', token, {httpOnly: true}).json(rest)
        }
    } catch (e) {
        next(e)
    }
}