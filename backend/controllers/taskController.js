
import jwt from "jsonwebtoken"
import Tasks from "../models/taskModel.js"
import Users from "../models/userModel.js"
import { SECRET_KEY } from "./userController.js"

let gettask = async (req, res) => {

    try {
        let tasks = await Tasks.find()
        res.status(201).json({ error: false, data: tasks })
    }
    catch (err) {
        res.status(501).json({ error: true, message: err.message })
    }
}

let addtask = async (req, res) => {

    try {

        let token = req.header("token")

        if (!token) {
            return res.status(501).json({ error: true, message: "token is not available" })
        }

        let LoggedInUser = jwt.verify(token, SECRET_KEY)

        let user = await Users.findById(LoggedInUser._id).populate("taskArray")

        if (!user) {
            return res.status(501).json({ error: true, message: "user not found" })
        }

        let { title, description, deadline, priority } = req.body

        let status = "pending"

        let task = await Tasks.create({ title, description, deadline, status, priority, user_id: user._id })
        user.taskArray.push(task)
        await user.save()

        res.status(201).json({ error: false, data: user })
    }
    catch (err) {
        res.status(501).json({ error: true, message: err.message })
    }

}

let updatetask = async (req, res) => {
    try {

        let { id } = req.params

        let { title, description, deadline, priority, status } = req.body

        let task = await Tasks.findById(id)

        if (!task) {
            return res.status(401).json({ error: true, message: "task not found" })
        }

        let Updatedtask = await Tasks.findByIdAndUpdate(task._id,
            {
                title: title || task.title,
                description: description || task.description,
                deadline: deadline || task.description,
                priority: priority || task.priority,
                status: status || task.status
            }, { new: true, runValidators: true }
        )

        res.status(201).json({ error: false, data: Updatedtask })

    }
    catch (err) {
        res.status(401).json({ error: true, message: err.message })
    }
}

let deletetask = async (req, res) => {
    try {

        let { id } = req.params

        let task = await Tasks.findByIdAndDelete(id)

        if (!task) {
            return res.status(401).json({ error: true, message: "task not found" })
        }

        let user = await Users.findById(task.user_id)

        user.taskArray.pull(id)
        await user.save()

        res.status(201).json({ error: false, data: { task, user } })

    }
    catch (err) {
        res.status(501).json({ error: true, message: err.message })
    }
}


export { addtask, updatetask, deletetask, gettask }