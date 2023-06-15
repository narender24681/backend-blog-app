const express = require("express");
const { UserModel } = require("../models/Auth.model");
const userRouter = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

userRouter.post("/register", async (req, res) => {
    const {username, avatar, email, password} = req.body;
    // console.log(username, avatar, email, password);

    try {
        bcrypt.hash(password, 5, async (err, hashPassword) => {
            const user = new UserModel({username, avatar, email, password: hashPassword});
            await user.save();
            // console.log(user);
    
            res.status(200).send({"msg": "User created successfully"});
        });

    }
    catch(err) {
        res.status(401).send({"err": err.message});
    }
});


userRouter.post("/login", async (req, res) => {
    const {email, password} = req.body;
    // console.log(email, password);
    
    try {
        const user = await UserModel.findOne({email});
        // console.log(user);

        if (user) {
            bcrypt.compare(password, user.password, async (err, result) => {
                if (result) {
                    var token = jwt.sign({ userId: user.id, userName: user.username }, 'someRandomSecretKey');
                    // console.log(token);

                    res.status(200).send({"token": token, "username": user.username, "msg": "User logged-in successfully"});
                }
                else {
                    res.status(200).send({"msg": "Invalid email/password"});
                }
            });
        }
        else {
            res.status(200).send({"msg": "Invalid email/password"});
        }
    }
    catch(err) {
        res.status(401).send({"err": err.message});
    }
});


module.exports = {
    userRouter
}