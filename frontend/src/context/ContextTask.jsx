
import { createContext, useState } from "react"
import axios from "axios"

export let TaskContext = createContext()

let TaskState = (props) => {

    const host = "http://localhost:9000/task"
    let [taskList, setTaskList] = useState("")

    let getTask = async () => {

        try {
            let {data} = await axios.get(
                `${host}/gettask`,
                {
                // method: 'GET',
                // mode: 'cors',
                headers : {
                    "Content-Type": "application/json",
                    // "token": localStorage.getItem("token")
                    "token": localStorage.getItem('token')
                },
            })
            // console.log(data.data)
            if(data.error==false){
                setTaskList(data.data)
            }else{
                console.log(data.message)
            }
        }
        catch (err) {
            console.log(err.message)
        }
    }

    let addTask = async (title, description, deadline, priority, status)=>{

        try {
            let {data} = await axios.post(
                `${host}/addtask`,
                {
                    title, description, deadline, priority, status
                },
                {
                    headers:{
                        "Content-Type":"application/json",
                        "token":localStorage.getItem('token')
                    }
                }
            )
            // console.log(data);
        } catch (error) {
            console.log(error);
        }

    }
    let editTask = async (title, description, deadline, priority, status, _id)=>{

        try {
            let {data} = await axios.put(
                `${host}/updatetask/${_id}`,
                {
                    title, description, deadline, priority, status
                },
                {
                    headers:{
                        "Content-Type":"application/json",
                        "token":localStorage.getItem('token')
                    }
                }
            )
            console.log(data);
        } catch (error) {
            console.log(error);
        }

    }

    let deleteTask = async(id)=>{
        try{
            let {data} = await axios.delete(`${host}/deletetask/${id}`)
        }
        catch(err){
            console.log(err);
        }

    }

    return <TaskContext.Provider value={{taskList, getTask, addTask, editTask, deleteTask}}>
        {props.children}
    </TaskContext.Provider>

}

export default TaskState