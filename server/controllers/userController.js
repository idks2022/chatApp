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
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

//create new user
const createUser = async (req, res) => {
  const user = req.body;
  try {
    const newUser = await userBLL.createUser(user);
    res.status(201).json(newUser);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Email is already in use" });
    } else {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
};

//update user
const updateUser = async (req, res) => {
  const { id, changes } = req.body;
  try {
    const updatedUser = await userBLL.updateUser(id, changes);
    res.status(200).json(updatedUser);
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

//authenticate user
const authUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const verifiedUser = await userBLL.authUser(email, password);
    res.status(200).json(verifiedUser);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUsers, createUser, updateUser, deleteUser, authUser };
