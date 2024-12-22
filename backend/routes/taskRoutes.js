
import express from "express"
import { gettask, addtask, updatetask, deletetask } from "../controllers/taskController.js"

let route = express.Router()

route.get("/gettask", gettask)
route.post("/addtask", addtask)
route.put("/updatetask/:id", updatetask)
route.delete("/deletetask/:id", deletetask)


export default route