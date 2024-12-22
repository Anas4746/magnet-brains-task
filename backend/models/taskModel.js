
import mongoose from "mongoose"

let { Schema } = mongoose

let taskSchema = mongoose.Schema({

    title: {
        required: true,
        minlenght: [3, "title should contain atleast 3 letters"],
        maxlenght: [50, "title should not contain more than 50 letters"],
        type: String
    },
    description: {
        required: true,
        minlenght: [10, "title should contain atleast 10 letters"],
        maxlenght: [50, "title should not contain more than 50 letters"],
        type: String
    },
    deadline: {
        required: true,
        type: Date
    },
    status: {
        type: String
    },
    priority: {
        type: String
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }

}, { versionKey: false })

export default mongoose.model("Tasks", taskSchema)