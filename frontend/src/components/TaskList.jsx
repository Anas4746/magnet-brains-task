
import React, { useContext, useEffect } from 'react'
import Style from "../css/TaskList.module.css"
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/ContextUser'


function TaskList(props) {

    let {getLoginUser, signinUser} = useContext(UserContext)

    let {task} = props
    let navigate = useNavigate()
    let status = ""
    if(task.status=='pending'){
        status = 'red'
    }else if(task.status == 'completed'){
        status = 'green'
    }
    let taskDetails = ()=>{
        navigate(`/task/${task._id}`)
    }

    useEffect(()=>{
        getLoginUser()
    },[])

    // console.log(signinUser);
    let userTask = ""
    if(signinUser?._id == task.user_id){
        userTask = "lightblue"
    }

  return (
    <div className={Style.taskCard} style={{"backgroundColor":userTask}}>
        <div className={Style.titlediv}>
            <span>Title: {task.title}</span>
        </div>
        <div className={Style.datediv}>
        <span>Deadline: {new Date(task.deadline).toLocaleDateString("en-US")}</span>
        </div>
        <div className={Style.statusdiv}>
            <div className={Style.status} style={{"color":status}}>{task.status}</div>
        </div>
        <div className={Style.detailsdiv}>
            <div className={Style.details} onClick={taskDetails}>Task Details</div>
        </div>
    </div>
  )
}

export default TaskList