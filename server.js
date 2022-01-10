require("dotenv").config();

const express = require("express");
const server = express();
server.listen(process.env.PORT, () => console.log(`server listening on port ${process.env.PORT}`));

// we require the ready-to-use database from lib/database.js
//const db = require("./lib/database.js");
require("./lib/database.js");

const User = require ("./models/User.js")

//server.use("/users", require("./routers/users.js"));

server.post("/users", async (req, res, next)=> {
    try {
        const newUser = await User.create("myUsername","myPassword","waytooold");
        res.json(newUser);
    }catch(error) {
        
    res.status(400).json(error);
    }

})

server.get("/comments", async (req, res, next) => {
    try {
        // in order to fetch data from a collection, we select the collection via collection() function,
        // then call find() to find all documents,
        // and limit the result to only 40.
        // the last function call .toArray() is needed to return an array with the result.
       // const comments = await db.collection("comments").find().limit(40).toArray();
        //res.json(comments);
    } catch (error) {
        next(error);
    }
});

server.use((error, req, res, next) => {
    res.status(500).end();
});
