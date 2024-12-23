import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Style from "../css/AddTask.module.css"; // Import the CSS file
import { TaskContext } from "../context/ContextTask";
import { useNavigate } from "react-router-dom";

function AddTask() {

  let {addTask}= useContext(TaskContext)
  let navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    let {title, description, deadline, priority, status} = data
    // console.log(title, description, deadline, priority, status);
    addTask(title, description, deadline, priority, status)
    navigate('/getTask')
  };

  let navigategetTask = ()=>{
    navigate('/getTask')
  }

  return (
    <div className={Style.form_container}>
      <form onSubmit={handleSubmit(onSubmit)} className={Style.task_form}>
        <h2 className={Style.form_heading}>Create a Task</h2>

        <div className={Style.form_group}>
          <label htmlFor="title" className={Style.form_label}>Title</label>
          <input
            id="title"
            type="text"
            className={Style.form_input}
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && <p className={Style.error}>{errors.title.message}</p>}
        </div>

        <div className={Style.form_group}>
          <label htmlFor="description" className={Style.form_label}>Description</label>
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
          <label htmlFor="deadline" className={Style.form_label}>Deadline</label>
          <input
            id="deadline"
            type="date"
            className={Style.form_input}
            {...register("deadline", { required: "Deadline is required" })}
          />
          {errors.deadline && <p className={Style.error}>{errors.deadline.message}</p>}
        </div>

        <div className={Style.form_group}>
          <label htmlFor="priority" className={Style.form_label}>Priority</label>
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
          {errors.priority && <p className={Style.error}>{errors.priority.message}</p>}
        </div>

        {/* <div className={Style.form_group}>
          <label htmlFor="status" className={Style.form_label}>Status</label>
          <select
            id="status"
            className={Style.form_select}
            {...register("status", { required: "Status is required" })}
          >
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
         {errors.status && <p className={Style.error}>{errors.status.message}</p>}
        </div> */}

        <button type="submit" className={Style.submit_button}>Submit</button>
        <button onClick={navigategetTask} className={Style.submit_button} style={{"backgroundColor":"#0d6efd","marginTop":"5px"}}>
                  Go to TaskList
        </button>
      </form>
    </div>
  );
}

export default AddTask;
