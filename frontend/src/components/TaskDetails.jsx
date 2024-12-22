
import React, { useContext, useEffect } from 'react'
import { TaskContext } from '../context/ContextTask'
import { useNavigate, useParams } from 'react-router-dom'
import Style from "../css/TaskList.module.css"
import { UserContext } from '../context/ContextUser'

function TaskDetails() {

    let {taskList, getTask} = useContext(TaskContext)
    let {getLoginUser, signinUser} = useContext(UserContext)
    let navigate = useNavigate()
    let {id} = useParams()
    let task = ""
    let color = ""
    let status = ""

    useEffect(()=>{
        getTask()
    }, [])

    // console.log(taskList)
    taskList&&taskList.forEach((ele)=>{
        // console.log(ele);
        if(ele._id == id){
            task = ele
            if(ele._id == id){
                task = ele
                if(task.priority == "low"){
                    color= "rgb(43 130 46 / 49%)"
                  }
                  else if(task.priority == "medium"){
                    color= "#fff06ccf"
                  }
                  else if(task.priority == "high"){
                    color= "rgb(255 126 126 / 72%)"
                  }
                if(task.status=='pending'){
                    status = 'red'
                }else if(task.status == 'completed'){
                    status = 'green'
                }
            }
        }
    })

    let taskDetails = ()=>{
        navigate(`/getTask`)
    }

    useEffect(()=>{
        getLoginUser()
    },[])
    
    let edit = false
    if(signinUser?._id == task.user_id){
        edit = true
    }

    let navigateEditTask = ()=>{
        navigate(`/edittask/${task._id}`)
    }

  return (
    <div className={Style.TaskDetailsContainer}>
        <div className={Style.taskCard} style={{"backgroundColor":color}}>
            <div className={Style.titlediv}>
                <span>Title: {task.title}</span>
            </div>
            <div className={Style.description}>
                <span>Description: {task.description}</span>
            </div>
            <div className={Style.datediv}>
            <span>Deadline: {new Date(task.deadline).toLocaleDateString("en-US")}</span>
            </div>
            <div className={Style.statusdiv}>
                <div className={Style.status} style={{"color":status}}>{task.status}</div>
            </div>
            {edit&&<div className={Style.detailsdiv}>
                <div className={Style.details} onClick={navigateEditTask}>Edit Task</div>
            </div>}
            <div className={Style.detailsdiv}>
                <div className={Style.details} onClick={taskDetails}>Task List</div>
            </div>
        </div>
    </div>
  )
}

export default TaskDetails