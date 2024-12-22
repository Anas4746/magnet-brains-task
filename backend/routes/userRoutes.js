
import express from "express"
import { register, loginUser, getLoginUser } from "../controllers/userController.js"

let route = express.Router()


route.post("/register", register)
route.post("/login", loginUser)
route.get("/getLoginUser", getLoginUser)

export default route