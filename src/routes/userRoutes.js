const express = require("express")

const {
    registerUser,
    loginUser,
} = require("../controllers/userControllers")

const userRouter = express.Router()

userRouter.post("/register", async (request, response) => {
    const bodyData = {
        username: request.body.username,
        phone: request.body.phone,
        email: request.body.email,
        password: request.body.password
    }
    const token = await registerUser(bodyData)
    if (token.error) {
        response.status(409).json(token)
    } else {
        response.json(token)
    }
})

// login - ? 
// function - body - if/else correct

module.exports = userRouter