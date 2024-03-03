import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    textContent : {
        type: String,
        required: true,
    },
    postId : {
        type: String,
        required: true,
    },
    userId : {
        type: String,
        required: true,
    },
    likes:{
        type: Array,
        default: [],
    },
    likesCount:{
        type: Number,
        default: 0,
    },
    

}, {timestamps: true},)


const Comment = mongoose.model('commentPost', commentSchema);
export default Comment