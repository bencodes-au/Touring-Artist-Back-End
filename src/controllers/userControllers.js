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
    const token = jwt.sign(payload, "secret");

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
    const token = jwt.sign(payload, "secret");

    return { token, user_id: existingUser._id };
  } catch (error) {
    console.error("Error in loginUser:", error.message);
    throw error;
  }
}

module.exports = {
  registerUser,
  loginUser,
};
