const express = require("express");
const jwt = require('jsonwebtoken');
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../Models/users")
const validUser = require("../utils/validateuser");
const redisClient = require("../config/redis");
const userAuth = require("../middleware/userAuth");

// /auth/register

authRouter.post("/register", async (req, res) => {

    try {

        // Validate kya uske andar firstName
        validUser(req.body);

        //  converting password into hashing
        req.body.password = await bcrypt.hash(req.body.password, 10);

        await User.create(req.body);
        res.send("User Registered Successfully");
    }
    catch (err) {
        res.send("Error " + err.message);
    }
})



authRouter.post("/login", async (req, res) => {

    try {

        // validate karna

        const people = await User.findOne({ emailId: req.body.emailId });

        console.log("Login attempt for:", req.body.emailId);

        if (!people) {
            throw new Error("no one exist ");
        }

        // if(!(req.body.emailId===people.emailId))
        //     throw new Error("Invalid credentials");

        const IsAllowed = await people.verifyPassword(req.body.password); //mongose method call

        if (!IsAllowed)
            throw new Error("Invalid credentials");


        // jwt token 

        const token = people.getJWT();

        res.cookie("token", token);
        res.send("Login Successfully");
    }
    catch (err) {
        res.send("Error: " + err.message);
    }
})


// /auth/logout

//Redis ke db me humko Blocked token dalbana hai taki logout ke bAAD KOI BHI API REQUEST NA KR PYE bhale token mil jye kisi ko (userAuth)

authRouter.post("/logout", userAuth, async (req, res) => {

    try {
        const { token } = req.cookies;
        const payload = jwt.decode(token);  //extracting info from token (header, payload,iat, exp)

        await redisClient.set(`token:${token}`, "Blocked"); //token:[actual-token],
        redisClient.expireAt(`token:${token}`, payload.exp); //automatic delete from redis db after exp time

        res.cookie("token", null, { expires: new Date(Date.now()) }); //This removes the authentication token from the client's browser
        res.send("logged out succesfully");

    }
    catch (err) {
        res.send("Error: " + err.message);
    }
})

module.exports = authRouter