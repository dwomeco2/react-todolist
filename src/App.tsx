import React, { useId, useState } from 'react';
import TaskListItem from './components/TaskListItem';
import { Icon, List, ListItem, InputBase, IconButton, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function Header() {
  return (
    <h2 className="w-full text-center mb-12 font-bold text-2xl">TodoList</h2>
  )
}

function NewTask(addToTaskList: (task: string) => void) {
  const [newTask, setNewTask] = useState('');

  const onKeyPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addNewTask();
    }
  }

  const addNewTask = () => {
    if (newTask !== '') {
      addToTaskList(newTask);
      setNewTask('');
    }
  }

  return (
    <Paper className="w-full flex mb-2 px-4 py-2">
      <InputBase
        type="text"
        className="flex-1 outline-none px-2"
        placeholder="Enter new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={onKeyPressed}
      ></InputBase>
      <IconButton className="self-center px-4" onClick={addNewTask}>
        <Icon component={AddIcon} fontSize="medium"></Icon>
      </IconButton>
    </Paper>
  );
}

type TaskType = {
  id: number,
  name: string,
}

export default function App() {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  const onChangeItemName = (e: React.ChangeEvent<HTMLInputElement>, targetId: number): void => {
    e.preventDefault();
    const newTasks = tasks.map((obj) => {
      if (obj.id === targetId) {
        return Object.assign({}, obj, { name: e.target.value });
      }
      return obj;
    });
    setTasks(newTasks);
  }

  const delItem = (id: number): void => {
    const newTasksList = tasks.filter((e) => e.id !== id);
    setTasks(newTasksList);
  };

  const addToTaskList = (newItem: string): void => {
    setTasks((prevState) => {
      return [...prevState, { id: prevState.length + 1, name: newItem }];
    });
  }

  return (
    <div className="flex justify-center">
      <div className="mx-auto w-1/2 mt-12">
        <Header />
        {NewTask(addToTaskList)}
        {tasks.map((item) => {
          return TaskListItem({ task: item, onChangeItemName, delItem });
        })}
      </div>
    </div>
  );
}
