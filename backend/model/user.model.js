import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        reqired: true,
        unique: true,
    },
    email:{
        type: String,
        reqired: true,
        unique: true,
    },
    password:{
        type: String,
        reqired: true,
    },
    profilePicture:{
        type:  String,
        default: 'https://e7.pngegg.com/pngimages/81/570/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png'
    },
    isAdmin:{
        type: Boolean,
        default: false
    },

}, {timestamps: true}
)

const User = mongoose.model('User', userSchema)

export default User

