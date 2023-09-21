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
    res.status(500).json({ message: "Server Error" });
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
      res.status(500).json({ message: "Server Error" });
      console.log(error);
    }
  }
};

//update user
const updateUser = async (req, res) => {
  const { id, changes } = req.body;
  try {
    const updatedUser = await userBLL.updateUser(id, changes);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    if (error.name === "CastError") {
      res.status(400).json({ message: "Invalid User ID" });
    } else {
      res.status(500).json({ message: "Server Error" });
    }
    console.log(error);
  }
};

//delete user
const deleteUser = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedUser = await userBLL.deleteUser(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
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
    if (error.message === "Invalid email or password") {
      res.status(401).json({ message: "Unauthorized" });
    } else {
      res.status(500).json({ message: "Server Error" });
    }
    console.log(error);
  }
};

module.exports = { getUsers, createUser, updateUser, deleteUser, authUser };
