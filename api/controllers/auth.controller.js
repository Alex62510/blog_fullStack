import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import {errorHandler} from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    const {username, email, password} = req.body
    if (!username || !email || !password || username === '' || email === '' || password === '') {
        next(errorHandler(400, "All field are required"))
    }
    const hashedPassword = bcryptjs.hashSync(password, 12)
    const newUser = new User({username, email, password: hashedPassword})

    try {
        await newUser.save()
        res.json("Signup successful")
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
const validUser=await User.findOne({email})
        if(!validUser){
             next(errorHandler(404,"User not found"))
        }
        const validPassword=bcryptjs.compareSync(password,validUser.password)
        if(!validPassword){
            next(errorHandler(400,'Invalid password!'))
        }
    } catch (e) {
        next(e)
    }
}