import {errorHandler} from "../utils/error.js";

export const test = (req, res) => {
    res.json({message: "Api is working!"})
}
export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'Your are not allowed to update this user!'))
    }
    if (req.body.password) {
        if (req.body.password < 6) {
            return next(errorHandler(400, 'Password must be more than 6 symbols'))
        }
        req.body.password = bcrypt.hashSync(req.body.password, 10)
    }
    if (req.body.username) {
        if (req.body.username < 7 || req.body.username > 20) {
            return next(errorHandler(400, 'Username must be between 7 and 20 symbols'))
        }
        if (req.body.username.includes(' ')) {
            return next(errorHandler(400, 'Username can not contain spaces'))
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
            return next(errorHandler(400, 'Username must be lowerCase'))
        }
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
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