import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId:{
            type: String,
            required: true,
        },
        content:{
            type: String,
            required: true,
        },
        title:{
            type: String,
            required: true,
            unique: true,
        },
        image:{
            type: String,
            default: "https://t4.ftcdn.net/jpg/01/93/22/45/360_F_193224512_jktLglscIiq6MtUSlT3a7xavUvEp5uAe.jpg"
        },
        category:{
            type: String,
            default: 'uncategorized',
            
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
    }, {timestamps: true}
)

const Post = mongoose.model('blogPost', postSchema);

export default Post