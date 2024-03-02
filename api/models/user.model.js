import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    profilePicture: {
        type: String,
        default: "https://kartinki.pics/uploads/posts/2022-12/thumbs/1670577804_5-kartinkin-net-p-neitralnie-kartinki-vkontakte-5.png"
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
}, {timestamps: true})
const User = mongoose.model('User', userSchema)
export default User