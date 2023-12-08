import { useState } from "react";
import { taskStore } from "../stores/taskStore";
import { userStore } from "../stores/userStore";

export const CreateTask = () => {
  const [task, setTask] = useState("");
  const { addTaskToServer } = taskStore();

  const taskInput = (e) => {
    setTask(e.target.value);
  };

  const addTaskLocal = async () => {
    if (task.trim() !== "") {
      await addTaskToServer(task);
      setTask(""); 
    }
  };
  return (
    <>
      <input
        type="text"
        placeholder="enter task"
        onChange={taskInput}
        value={task}
        className="task-input"
      />
      <div>
      <button onClick={addTaskLocal} className="task-button">Add Task</button>
      </div>
    </>
  );
};
