//userBLL.js
const User = require("../models/userModel");

//CRUD operations:

const getUsers = async (query) => {
  const users = await User.find(query);
  return users;
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

module.exports = { getUsers, createUser, updateUser, deleteUser };
