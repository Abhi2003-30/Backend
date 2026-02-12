const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: "",
    },
    imgUrl: {
        type: String,
        required: [true, "imgurl is required for creating an post"],
    },
    users: {
        ref: "users",
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "user id is required for creating an post"]
    }
})

const postModel = mongoose.model("posts", postSchema)

module.exports = postModel