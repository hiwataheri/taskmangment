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

const User = mongoose.connection.model("User", schema);

async function create (username, password,age) {
    const newUser = new User({
        username,
        password,
        age,
    })
   // console.log(newUser)
   //console.log("before save");
    return await newUser.save();
}

async function readOldVersion() {
  // get all information about our users
  const users = await User.find();

  const usersWithoutPasswords = users.map((user) => {
    return {
      _id: user._id,
      username: user.username,
      age: user.age,
    };
  });

  // return only username, _id and age per user
  return usersWithoutPasswords;
}

async function read() {
  // we can use .find() as we know from mongodb to fetch data from the database
  // there are many ways to tell mongoose which properties we want to fetch from each document
  // we call that 'projection' and it can be part of the find method as the second parameter

  // const users = await User.find({}, { password: 0, age: 0 });
  // const users = await User.find({}, "_id username age");
  // const users = await User.find({}, ["_id", "username", "age"]);

  // we can also chain a separate function after find to do a projection
  // that one is called .select() and works just the same way as the second find parameter
  const users = await User.find({}).select(["_id", "username", "age"]);

  return users;
}

// to update a user we need its userId and the properties we want to change
// when we use an object as parameter and destructuring to get the properties it will be easier to work with it
// on function call we do not need to have the parameters in the right order as they are just properties of an object
async function update(userId, { username, age, password, email }) {
  await User.findByIdAndUpdate(userId, {
    username,
    age,
    password,
    email,
  });
}

// to delete a user we need its userId again
// but this time that is all we need
// we can then use .findByIdAndDelete() to do exactly what it says: find the user by its ID and delete
async function remove(userId) {
  await User.findByIdAndDelete(userId);
}

// we only export our functions here to encapsulate the database logic
// if you decided to use static functions instead, you may want to export the model itself
module.exports = {
  create,
  read,
  update,
  remove,
};









/* 
async function read () {

}
module.exports={
    create,
    read, 
}
 */
