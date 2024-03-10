import { useState } from "react";
import { nanoid } from "nanoid";

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
