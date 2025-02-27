const mongoose = require("mongoose")

const UserSchema = mongoose.Schema(
    {
    username: {type: String, required: true, unique: true},
    phone: {type: String, required: false,unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, unique: true}
    },
    {timestamps: true}
)


const UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel