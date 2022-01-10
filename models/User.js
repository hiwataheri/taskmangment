const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    username: {
        type:String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
},
{
    versionkey:false,
})

const User = mongoose.connection.model("Product", schema);

async function create (username, password,age) {
    const newUser = new User({
        username,
        password,
        age,
    })
    console.log(newUser)
    //console.log("before save");
    //return await newUser.save();
}

async function read () {

}
module.exports={
    create,
    read, 
}