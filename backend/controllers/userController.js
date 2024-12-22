
import Users from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const SECRET_KEY = "TERCESYEK"

let register = async (req, res) => {

    try {
        let { email, pass, cpass } = req.body

        if (pass !== cpass) {
            return res.status(401).json({ error: true, message: "Password and confirm password is not matching." })
        }
        let UserExist = await Users.findOne({ email })

        if (UserExist) {
            return res.status(401).json({ error: true, message: "Email already taken." })
        }

        let salt = await bcrypt.genSalt(10)

        let hashpass = await bcrypt.hash(cpass, salt)

        let user = await Users.create({ email, password: hashpass })

        let token = jwt.sign({ _id: user._id, email, password: hashpass }, SECRET_KEY)

        res.status(200).json({ error: false, data: token })
    }
    catch (err) {
        res.status(501).json({ error: true, message: err.message })
    }
}

let loginUser = async (req, res) => {

    try {
        let { email, password } = req.body

        if (!email || !password) {
            return res.status(500).json({ error: true, message: "email and password mandatory" })
        }

        let isUserAvailable = await Users.findOne({ email })

        if (isUserAvailable) {
            let isPasswordMatching = await bcrypt.compare(password.toString(), isUserAvailable.password)
            if (isPasswordMatching) {
                let token = await jwt.sign({ _id: isUserAvailable._id, email, password }, SECRET_KEY)
                return res.status(201).json({ error: false, data: token })
            }
            return res.status(500).json({ error: true, message: "Incorrect credentials" })
        }

        return res.status(500).json({ error: true, message: "No User found with this given email" })

    }
    catch (err) {
        res.status(500).json({ error: true, message: err.message })
    }

}

let getLoginUser = async (req, res) => {
    try {
        let token = req.header("token")
        if (!token) {
            return res.status(501).json({ error: true, message: "token is not available" })
        }
        let LoggedInUser = jwt.verify(token, SECRET_KEY)
        let user = await Users.findById(LoggedInUser._id).populate("taskArray")
        res.status(201).json({ error: false, message: "User get successfully", user })
    }
    catch (err) {
        res.status(501).json({ error: true, message: err.message })
    }
}

export { register, loginUser, getLoginUser }