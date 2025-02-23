const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/user")

async function registerUser(user) {
    // // check for existing username and email
    const existingEmail = await User.findOne({ email: user.email})
    if (existingEmail) {
        return { error: "Email already in use"}
    }

    const existingUser = await User.findOne({ username: user.username})
    if (existingUser) {
        return { error: "Username already in use"}
    }

    // hash password
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // create user
    const userCreated = await User.create({
        username: user.username,
        phone: user.phone,
        email: user.email,
        password: hashedPassword,
    })
    // create token
    const payload = {
        id: userCreated._id
    }
    const token = jwt.sign(payload, "secret")
    return { token: token, user_id: userCreated._id }
}

async function loginUser(user){
    // check if user exists

    // check if password matches

    // create the token

    // return the token
}

module.exports = {
    registerUser,
    loginUser,
}