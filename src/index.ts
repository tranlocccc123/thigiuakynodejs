import yargs from 'yargs';
import clc from 'cli-color';
import {
  readAllTask,
  createTask,
  readDetailTask,
  deleteTask,
  updateTask,
} from './models/mytask';

yargs.command({
  command: "test",
  handler: () => {
    console.log("testing");
  },
});

yargs.command({
  command: "create",
  builder: {
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
  },
  handler: (args) => {
    const {title, description } = args;
    const newTask = createTask(title, description);
    console.log("Created task successfully: ", newTask);
  },
});

yargs.command({
  command: "read-all",
  handler: () => {
    const result = readAllTask();
    console.log(clc.blue("AllTasks : "), result);
  },
});

yargs.command({
  command: "read-detail",
  builder: {
    id: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id } = args;
    const task = readDetailTask(id);
    if (task) {
      console.log("My task : ", task);
    } else {
      console.log("Not Found Task!");
    }
  },
});

yargs.command({
  command: "update",
  builder: {
    id: {
      type: "string",
    },
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id, title, description } = args;
    const task = updateTask(id, title, description);
    if (task) {
      console.log("task updated : ", task);
    } else {
      console.log(clc.red("Not Found Task !"));
    }
  },
});

yargs.command({
  command: "delete",
  builder: {
    id: {
      type: "string",
    },
  },
  handler: (args) => {
    const { id } = args;
    const task = deleteTask(id);
    if (task) {
      console.log("Delete task : ", task);
    } else {
      console.log("Not Found task to delete");
    }
  },
});

yargs.parse();
