import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Style from "../css/AddTask.module.css";
import { TaskContext } from "../context/ContextTask";
import { useNavigate, useParams } from "react-router-dom";

function EditTask() {
  let { taskList, editTask, getTask, deleteTask } = useContext(TaskContext);
  let navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    getTask(); 
  }, []);

  let task = ""
  if (taskList){
        taskList.forEach((ele) => {
            if(ele._id == id){
                return task = ele
            }
        }); 
  }

  let {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (task) {
      setValue("title", task.title);
      setValue("description", task.description);
      setValue("deadline", task.deadline.split("T")[0]);
      setValue("priority", task.priority);
      setValue("status", task.status);
    }
  }, [task, setValue]);

  let onSubmit = (data) => {
    console.log(data);
    let {title, description, deadline, priority, status,} = data 
    console.log(title, description, deadline, priority, status, task._id);
    editTask(title, description, deadline, priority, status, task._id)
    navigate('/getTask')
  };


  let Taskdelete = ()=>{
    let deletetask = confirm("Are you sure you want to delete task ?")
    if(deletetask){
      deleteTask(task._id)
      navigate('/getTask')
    }
  }
  

  return (
    <div className={Style.form_container}>
      <form onSubmit={handleSubmit(onSubmit)} className={Style.task_form}>
        <h2 className={Style.form_heading}>Edit Task</h2>

        <div className={Style.form_group}>
          <label htmlFor="title" className={Style.form_label}>
            Title
          </label>
          <input
            id="title"
            type="text"
            className={Style.form_input}
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && <p className={Style.error}>{errors.title.message}</p>}
        </div>

        <div className={Style.form_group}>
          <label htmlFor="description" className={Style.form_label}>
            Description
          </label>
          <textarea
            id="description"
            className={Style.form_textarea}
            {...register("description", { required: "Description is required" })}
          ></textarea>
          {errors.description && (
            <p className={Style.error}>{errors.description.message}</p>
          )}
        </div>

        <div className={Style.form_group}>
          <label htmlFor="deadline" className={Style.form_label}>
            Deadline
          </label>
          <input
            id="deadline"
            type="date"
            className={Style.form_input}
            {...register("deadline", { required: "Deadline is required" })}
          />
          {errors.deadline && (
            <p className={Style.error}>{errors.deadline.message}</p>
          )}
        </div>

        <div className={Style.form_group}>
          <label htmlFor="priority" className={Style.form_label}>
            Priority
          </label>
          <select
            id="priority"
            className={Style.form_select}
            {...register("priority", { required: "Priority is required" })}
          >
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && (
            <p className={Style.error}>{errors.priority.message}</p>
          )}
        </div>

        <div className={Style.form_group}>
          <label htmlFor="status" className={Style.form_label}>
            Status
          </label>
          <select
            id="status"
            className={Style.form_select}
            {...register("status", { required: "Status is required" })}
          >
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
          {errors.status && (
            <p className={Style.error}>{errors.status.message}</p>
          )}
        </div>

        <button type="submit" className={Style.submit_button}>
          Update Task
        </button>
        <button type="button" onClick={Taskdelete} className={Style.submit_button} style={{"backgroundColor":"#dc3545","marginTop":"5px"}}>
          Delete Task
        </button>
      </form>
    </div>
  );
}

export default EditTask;
