//index.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const usersRoutes = require("./routes/userRoutes.js");
const chatRoutes = require("./routes/chatRoutes.js");
const messageRoutes = require("./routes/messageRoutes.js");

const app = express();
const port = 3000;

connectDB();

app.use(cors());
app.use(express.json());

//Routes
app.use("/users", usersRoutes);
app.use("/chats", chatRoutes);
app.use("/messages", messageRoutes);

app.listen(port, () => console.log(`Server is listening on port ${port}!`));
