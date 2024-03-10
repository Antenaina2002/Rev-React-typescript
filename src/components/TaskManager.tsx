import React, { useState } from "react";
import { nanoid } from "nanoid";
import "./TaskManager.css";

interface Task {
  id: string;
  title: string;
}

interface TaskManagerOperations {
  addTask: (title: string) => void;
  completeTask: (id: string) => void;
  updateTask: (id: string, taskUpdate: Partial<Task>) => void;
  setSearchKeyword: (searchKeyword: string) => void;
  setTitle: (title: string) => void;
  title: string;
  tasks: Task[];
  filteredTasks: Task[];
}

export const useTaskManager = (): TaskManagerOperations => {
  const [title, setTitle] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const completeTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const updateTask = (id: string, taskUpdate: Partial<Task>) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, ...taskUpdate } : task))
    );
  };

  const addTask = () => {
    if (title.length < 1) {
      return;
    }

    const newTask: Task = {
      id: nanoid(),
      title,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTitle("");
  };

  const handleSearch = (searchKeyword: string) => {
    setSearchKeyword(searchKeyword);
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return {
    addTask,
    completeTask,
    updateTask,
    setSearchKeyword: handleSearch,
    setTitle, 
    title,
    tasks,
    filteredTasks,
  };
};


export const TaskManager: React.FC = () => {
  const {
    addTask,
    completeTask,
    updateTask,
    setSearchKeyword,
    setTitle,
    title,
    tasks,
    filteredTasks,
  } = useTaskManager();

  const handleKeyPress = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === "Enter") {
      addTask(title);
    }
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div>
        <input
          type="text"
          onChange={(ev) => setSearchKeyword(ev.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search Task"
        />
      </div>

      <div className="task">
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          onKeyPress={handleKeyPress}
        />

        <button onClick={() => addTask(title)}>Add Task</button>
      </div>

      <ul className="container">
        {filteredTasks.map((task) => (
          <li key={task.id} className="task">
            <div className="task">
              <input
                type="text"
                placeholder="Add new task"
                value={task.title}
                onChange={(e) => updateTask(task.id, { title: e.target.value })}
              />
              <button onClick={() => completeTask(task.id)}>Done</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};