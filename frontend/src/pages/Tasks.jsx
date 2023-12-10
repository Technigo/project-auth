import { useEffect } from "react";
import Logos from "../components/Logos";
import { CreateTask } from "../components/CreateTask";
import { taskStore } from "../stores/taskStore";
import { userStore } from "../stores/userStore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export const Tasks = () => {
  
  const text = {
    heading: "Tasks Page",
    intro: "Manage your tasks here",
    taskManagementGuide:
      "To make the most out of this task management app, start by inputting your tasks in the field provided. Click on each task to edit its details. You can mark a task as completed or delete it entirely. Use the 'Delete All Tasks' button to clear your task list. Stay organized and boost your productivity!",
  };
  

  const { tasks, deleteAllTasks, fetchTasks, handleEdit, deleteTaskById } =
    taskStore();
  const { accessToken } = userStore();

  useEffect(() => {
    fetchTasks();
  }, [tasks, accessToken]);

  const navigate = useNavigate();
  const storeHandleLogout = userStore((state) => state.handleLogout);
  
  const onLogoutClick = () => {
    storeHandleLogout();
    alert("Log out succesfull");
    navigate("/"); 
  };

  return (
    <>
      <nav className="app-button-wrapper">
        <ul className="app-ul">
          <li className="app-li">
            <Link to="/home" className="app-link">Home</Link>
          </li>
          <li className="app-li">
            <Link to="/tasks" className="app-link">Tasks</Link>
          </li>
          <li className="app-li">
            <button onClick={onLogoutClick} className="app-button">Sign Out</button>
          </li>
        </ul>
      </nav>
      <Logos />
      <div className="card-container">
        <h2>{text.heading}</h2>
        <p>{text.intro}</p>
        <p>{text.taskManagementGuide}</p>
        <div>
        <CreateTask />
        </div>
        <button onClick={deleteAllTasks} className="task-button">Delete All Tasks</button>
        {tasks.length === 0 ? (
          <>
            <p>No tasks yet...</p>
          </>
        ) : (
          tasks.map((task, index) => (
            <div
              className={`card-container2 ${
                task.done ? "green-border" : "red-border"
              }`}
              key={index}
              onClick={() => handleEdit(task._id)}
            >
              <p>{task.task}</p>
              <p>{task.done ? "Task is Completed" : "Not Completed"}</p>
              <button onClick={() => deleteTaskById(task._id)} className="task-button">Delete</button>
            </div>
          ))
        )}
      </div>
    </>
  );
};
