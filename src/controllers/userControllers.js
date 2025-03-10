const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function registerUser(user) {
  try {
    // Check for existing email
    const existingEmail = await User.findOne({ email: user.email });
    if (existingEmail) {
      const error = new Error("Email already in use");
      error.status = 409;
      throw error;
    }

    // Check for existing username
    const existingUser = await User.findOne({ username: user.username });
    if (existingUser) {
      const error = new Error("Username already in use");
      error.status = 409;
      throw error;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // Create user
    const userCreated = await User.create({
      username: user.username,
      phone: user.phone,
      email: user.email,
      password: hashedPassword,
    });

    // Create token
    const payload = { id: userCreated._id };
    const token = jwt.sign(payload, "secret", { expiresIn: "1hr" });

    return { token: token, user_id: userCreated._id };
  } catch (error) {
    console.error("Error in registerUser:", error.message);
    throw error;
  }
}

async function loginUser(user) {
  try {
    // Check if user exists
    const existingUser = await User.findOne({ email: user.email });
    if (!existingUser) {
      const error = new Error("Email or password is incorrect");
      error.status = 401;
      throw error;
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(user.password, existingUser.password);
    if (!isMatch) {
      const error = new Error("Email or password is incorrect");
      error.status = 401;
      throw error;
    }

    // Create the token
    const payload = { id: existingUser._id };
    const token = jwt.sign(payload, "secret", { expiresIn: "1hr" });

    return { token, user_id: existingUser._id };
  } catch (error) {
    console.error("Error in loginUser:", error.message);
    throw error;
  }
}

async function getUsers() {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.error("Error in getUsers:", error.message);
    throw new Error("Failed to fetch users");
  }
}

async function getUser(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }
    return user;
  } catch (error) {
    console.error("Error in getUser:", error.message);
    throw new Error("Failed to fetch user");
  }
}

async function updateUser(userId, bodyData) {
  try {
    if (bodyData.password) {
      bodyData.password = await bcrypt.hash(bodyData.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, bodyData, {
      new: true,
    });
    if (!updatedUser) {
      throw new Error(`User with id ${userId} not found`);
    }
    return updatedUser;
  } catch (error) {
    console.error("Error in updateUser:", error.message);
    throw new Error("Failed to update user");
  }
}

async function deleteUser(userId) {
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new Error(`User with id ${userId} not found`);
    }
    return deletedUser;
  } catch (error) {
    console.error("Error in deleteUser:", error.message);
    throw new Error("Failed to delete user");
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
