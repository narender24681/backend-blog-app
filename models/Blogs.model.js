const mongoose = require("mongoose");

const blogsSchema = mongoose.Schema({
    username: {type: String, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    category: {type: String, required: true},
    date: {type: String, required: true},
    userId: {type: String, required: true},
    likes: {type: Number, default: 0},
    comments: {type: [], default: []},
}, {
    versionKey: false
});

const BlogsModel = mongoose.model("blogs", blogsSchema);

module.exports = {
    BlogsModel
}
