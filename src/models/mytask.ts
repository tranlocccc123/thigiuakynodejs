import fs from 'fs';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

interface Task {
  id: string;
  title: string;
  description: string;
}

const readAllTask = (): Task[] => {
  const buffer = fs.readFileSync("task.json");
  const taskString: string = buffer.toString();
  const taskJson: Task[] = JSON.parse(taskString);
  return taskJson;
};

const createTask = (title: string, description: string): Task => {
  const newTask: Task = {
    id: Math.random().toString(),
    title,
    description,
  };
  let taskList: Task[] = readAllTask();
  taskList = [...taskList, newTask];
  fs.writeFileSync("task.json", JSON.stringify(taskList));
  return newTask;
};

const readDetailTask = (id: string): Task | undefined => {
  let taskList: Task[] = readAllTask();
  const task = taskList.find((task) => id === task.id);
  return task;
};

const deleteTask = (id: string): Task | false => {
  let taskList: Task[] = readAllTask();
  const indexTask : number = taskList.findIndex((task) => task.id === id);
  if (indexTask !== -1) {
    const task: Task = taskList[indexTask];
    taskList = taskList.filter((task) => task.id !== id);
    fs.writeFileSync("task.json", JSON.stringify(taskList));
    return task;
  } else {
    return false;
  }
};

const updateTask = (id: string, title: string, description: string): Task | false => {
  let taskList: Task[] = readAllTask();
  const indexTask: number = taskList.findIndex((task) => task.id === id);
  if (indexTask !== -1) {
    const oldTask: Task = taskList[indexTask];
    const newTask: Task = { ...oldTask, title, description };
    taskList[indexTask] = newTask;
    fs.writeFileSync("task.json", JSON.stringify(taskList));
    return newTask;
  } else {
    return false;
  }
};

export {
  readAllTask,
  createTask,
  readDetailTask,
  deleteTask,
  updateTask,
};
