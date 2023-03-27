const mongoose = require('mongoose')
require('dotenv').config()

const postSchema = mongoose.Schema({
    title: String,
    body: String,
    device: { type: String, enum: ["tablet", "mobile", "laptop"] },
    no_of_comments: Number,
    userID: String
})

const PostModel = mongoose.model("post", postSchema)

module.exports = PostModel