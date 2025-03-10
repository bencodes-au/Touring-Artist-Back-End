const express = require("express");
const {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");

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

// Get Users (Get all users)
userRouter.get("/", async (request, response) => {
  try {
    const users = await getUsers();
    response.status(200).json(users);
  } catch (error) {
    console.error("Error in GET /users:", error.message);
    response.status(500).json({ error: "Failed to retrieve users" });
  }
});

// Get User by ID
userRouter.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await getUser(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in GET /:id:", error.message);
    res.status(error.status || 500).json({ message: error.message });
  }
});

// Update User by ID
userRouter.put("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedData = req.body;
    const updatedUser = await updateUser(userId, updatedData);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in PUT /:id:", error.message);
    res.status(error.status || 500).json({ message: error.message });
  }
});

// Delete User by ID
userRouter.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await deleteUser(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error in DELETE /:id:", error.message);
    res.status(error.status || 500).json({ message: error.message });
  }
});
module.exports = userRouter;
