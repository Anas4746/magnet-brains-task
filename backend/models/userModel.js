
import mongoose from "mongoose"

// const { Schema } = mongoose;

let userSchema = mongoose.Schema({

    email: {
        required: true,
        type: String,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"]
    },
    password: {
        required: true,
        type: String
    },
    taskArray: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tasks'
    }]

}, { versionKey: false })

export default mongoose.model('Users', userSchema)