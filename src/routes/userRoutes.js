const express = require("express");
const { registerUser, loginUser } = require("../controllers/userControllers");

const userRouter = express.Router();

// Register route
userRouter.post("/register", async (request, response) => {
  try {
    const bodyData = {
      username: request.body.username,
      phone: request.body.phone,
      email: request.body.email,
      password: request.body.password,
    };

    const token = await registerUser(bodyData);
    response.status(201).json(token);
  } catch (error) {
    console.error("Error in /register:", error.message);
    response.status(error.status || 500).json({ message: error.message });
  }
});

// Login route
userRouter.post("/login", async (req, res) => {
  try {
    const bodyData = {
      email: req.body.email,
      password: req.body.password,
    };

    const token = await loginUser(bodyData);
    res.status(200).json(token);
  } catch (error) {
    console.error("Error in /login:", error.message);
    res.status(error.status || 500).json({ message: error.message });
  }
});

module.exports = userRouter;
