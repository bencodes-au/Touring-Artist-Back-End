const dotenv = require("dotenv")
dotenv.config()

const { app } = require("./server")

app.listen(3000, () => {
    console.log("Server is running on 3000")
})