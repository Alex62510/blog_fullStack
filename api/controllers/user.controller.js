import {errorHandler} from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";

export const test = (req, res) => {
    res.json({message: "Api is working!"})
}
export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'Your are not allowed to update this user!'))
    }
    if (req.body.password) {
        if (req.body.password.length < 5) {
            return next(errorHandler(400, 'Password must be more than 6 symbols'))
        }
        req.body.password = await bcryptjs.hashSync(req.body.password, 10)
    }
    if (req.body.username) {
        if (req.body.username.length < 4 || req.body.username.length > 20) {
            return next(errorHandler(400, 'Username must be between 7 and 20 symbols'))
        }
        if (req.body.username.includes(' ')) {
            return next(errorHandler(400, 'Username can not contain spaces'))
        }
        if (req.body.username[0] !== req.body.username[0].toUpperCase()) {
            return next(errorHandler(400, 'Username must start to upperCase symbol'))
        }
        if (!req.body.username.match(/^[a-zA-Z0-9а-яА-Я]+$/)) {
            return next(
                errorHandler(400, 'Username can only contain letters and numbers')
            );
        }
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    profilePicture: req.body.profilePicture,
                    password: req.body.password,
                },
            },
            {new: true}
        );
        const {password, ...rest} = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'Your are not allowed to delete this account!'))
    }
    try {
       await User.findByIdAndDelete(req.params.userId)
        res.status(200).json('Use has been deleted');
    }catch (e) {
      next(e)
    }
}