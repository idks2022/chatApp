//userRoutes.js
const express = require("express");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  authUser,
} = require("../controllers/userController");
const router = express.Router();

router.route("/").get(getUsers); //get user(s) by searching ".../users?search='query'"
router.route("/").post(createUser); //create new user
router.route("/").patch(updateUser); //update user
router.route("/").delete(deleteUser); //delete user
router.route("/signin").post(authUser); //authenticate user on signin

module.exports = router;
