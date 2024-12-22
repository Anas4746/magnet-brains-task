
import React, { useContext, useEffect, useState } from 'react'
import { TaskContext } from '../context/ContextTask'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Style from "../css/Task.module.css"
import { FiPlusCircle } from "react-icons/fi";
import TaskList from './TaskList'

function Task() {

    let {taskList, getTask} = useContext(TaskContext)
    let navigate = useNavigate()
    let lowTasks = []
    let mediumTasks = []
    let highTasks = []
    
    if(!localStorage.getItem('token')){
      navigate('/login')
    }
    useEffect(()=>{
      getTask()
    },[])
    
    taskList&&taskList.forEach((task)=>{
      if(task.priority == "low"){
        lowTasks.push(task)
      }
      else if(task.priority == "medium"){
        mediumTasks.push(task)
      }
      else if(task.priority == "high"){
        highTasks.push(task)
      }
    })

    let navigateAddtask = ()=>{
      navigate('/addtask')
    }

    // console.log(lowTasks, highTasks, mediumTasks);

  return (
    <>
      <Navbar/>
      <div className={Style.taskContainer}>
        <h1>Task List</h1>
        <div className={Style.taskDiv}>
          <div className={`${Style.immediate} ${Style.taskContain1}`}>
            <h2>Immediate Tasks</h2>
            <div className={`${Style.taskContain}`}>
              {taskList&&highTasks?.map((task)=>{
                return <TaskList key={task._id} task={task}/>
              })}
              <div className={Style.taskCard} onClick={navigateAddtask}>
                  <FiPlusCircle className={Style.plus} />
              </div>
            </div>
          </div>
          <div className={`${Style.soon} ${Style.taskContain2}`}>
            <h2>Soon Tasks</h2>
            <div className={`${Style.taskContain}`}>
            {taskList&&mediumTasks?.map((task)=>{
                return <TaskList key={task._id} task={task}/>
              })}
              <div className={Style.taskCard} onClick={navigateAddtask}>
                  <FiPlusCircle className={Style.plus} />
              </div>
            </div>
          </div>
          <div className={`${Style.later} ${Style.taskContain3}`}>
            <h2>Later Tasks</h2>
            <div className={`${Style.taskContain}`}>
            {taskList&&lowTasks?.map((task)=>{
                return <TaskList key={task._id} task={task}/>
              })}
              <div className={Style.taskCard} onClick={navigateAddtask}>
                  <FiPlusCircle className={Style.plus} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Task