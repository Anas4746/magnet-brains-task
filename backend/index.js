
import express from "express"
import mongoose from "mongoose"
import userRoutes from "./routes/userRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"
import cors from "cors"


let app = express()

app.use(cors())

let PORT = process.env.PORT || 9000
let MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/taskdb"

app.options('*', cors());

app.use(express.json())

app.use("/user", userRoutes)
app.use("/task", taskRoutes)

app.use("*", (req, res) => {
    res.status(401).json({ error: true, message: "Page not found." })
})

mongoose.connect(MONGO_URI)
    .then((data) => {
        console.log("Connect with MongoDB")
    }).catch((err) => {
        console.log({ err, message: err.message })
    })

app.listen(PORT, () => {
    console.log("App running on 9000 PORT")
})