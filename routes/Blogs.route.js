const express = require("express");
const { auth } = require("../middlewares/Auth.middleware");
const { BlogsModel } = require("../models/Blogs.model");
const blogsRouter = express.Router();





blogsRouter.post("/", auth, async (req, res) => {
    // console.log(req.body);

    try {
        const blog = new BlogsModel(req.body);
        await blog.save();
        // console.log(blog);

        res.status(200).send({"msg": "Post created"});
    }
    catch(err) {
        console.log("-------------------------------")
        res.status(401).send({"err": err.message});
    }
});


blogsRouter.get("/", async (req, res) => {
    try {
        let page = 8;

        // if (page <= 0) {
        //     page = 1;
        // }
        // if (page >= 1) {
        //     page -= 1;
        // }
        console.log(page);

        const posts = await BlogsModel.find().limit(5).skip(6);
        // console.log(posts);

        res.status(200).send(posts);
    }
    catch(err) {
        res.status(401).send({"err": err.message});
    }
});




// blogsRouter.post("", async (req, res) => {
//     try {
        
//         res.status(200).send({"msg": "some message"});
//     }
//     catch(err) {
//         res.status(401).send({"err": err.message});
//     }
// });


module.exports = {
    blogsRouter
}