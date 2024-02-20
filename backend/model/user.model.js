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
        default: 'https://w7.pngwing.com/pngs/304/275/png-transparent-user-profile-computer-icons-profile-miscellaneous-logo-monochrome-thumbnail.png'
    },

}, {timestamps: true}
)

const User = mongoose.model('User', userSchema)

export default User

