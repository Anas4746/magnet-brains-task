
import express from "express"
import mongoose from "mongoose"
import userRoutes from "./routes/userRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"
import cors from "cors"


let app = express()

let corsOptions = {
    origin: 'http://localhost:5173', // Allow only this origin
    methods: 'GET,POST,PUT,DELETE', // Allow these HTTP methods
    allowedHeaders: 'Content-Type,Authorization' // Allow these headers
}

app.use(cors())

app.options('*', cors());

app.use(express.json())

app.use("/user", userRoutes)
app.use("/task", taskRoutes)

app.use("*", (req, res) => {
    res.status(401).json({ error: true, message: "Page not found." })
})

mongoose.connect("mongodb://127.0.0.1:27017/taskdb")
    .then((data) => {
        console.log("Connect with MongoDB")
    }).catch((err) => {
        console.log({ err, message: err.message })
    })

app.listen(9000, () => {
    console.log("App running on 9000 PORT")
})