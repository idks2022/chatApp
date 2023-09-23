//userBLL.js
const genereateToken = require("../config/JWT");
const User = require("../models/userModel");

//CRUD operations:

//get all users but the requesting user
const getUsers = async (query) => {
  const users = await User.find(query).select("name email pic _id");
  return users;
};

const getUser = async (query) => {
  const user = await User.findOne(query).select("name email pic _id");
  return user;
};

const createUser = async (userData) => {
  const newUser = await User.create(userData);
  return newUser;
};

const updateUser = async (id, changes) => {
  const updatedUser = await User.findByIdAndUpdate(id, changes, { new: true });
  return updatedUser;
};

const deleteUser = async (id) => {
  const deletedUser = await User.findByIdAndDelete(id);
  return deletedUser;
};

const authUser = async (email, password) => {
  //check this user exists
  const user = await User.findOne({ email });

  //if so, validate password
  if (user && (await user.isValidPassword(password))) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      accessToken: genereateToken(user._id),
    };
  } else {
    throw new Error("Invalid email or password");
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  authUser,
};
