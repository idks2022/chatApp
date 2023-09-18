//userController.js
const userBLL = require("../BLL/userBLL");

//get user(s) by searching ".../users?search='query'"
const getUsers = async (req, res) => {
  const query = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  try {
    const users = await userBLL.getUsers(query);
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

//create new user
const createUser = async (req, res) => {
  const user = req.body;
  const { email } = req.body;

  try {
    //check this email doesn't already exists
    const userExists = await userBLL.getUsers({ email });
    if (userExists.length > 1) {
      res.status(400);
      throw new Error("Email is already in use");
      return;
    }

    const newUser = await userBLL.createUser(user);
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
  }
};

//update user
const updateUser = async (req, res) => {
  const { id, changes } = req.body;
  try {
    const updatedUser = await userBLL.updateUser(id, changes);
    res.json(updatedUser);
  } catch (error) {
    console.log(error);
  }
};

//delete user
const deleteUser = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedUser = await userBLL.deleteUser(id);
    res.json(deletedUser);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUsers, createUser, updateUser, deleteUser };
