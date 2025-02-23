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

userRouter.post("/login", async (req, res) => {
    const bodyData = {
        email: req.body.email,
        password: req.body.password
    }
    const token = await loginUser(bodyData)
    if (token.error) {
        res.status(401).json(token)
    } else {
        res.json(token)
    }
})

module.exports = userRouter