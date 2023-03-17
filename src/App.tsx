import React, { useState } from 'react';
import './style.css';

import ListItem from './components/ListItem';

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
    <>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={onKeyPressed}
      ></input>
      <span onClick={addNewTask}>
        Add
      </span>
    </>
  );
}

export default function App() {
  const [tasks, setTasks] = useState([
    {
      name: 'aaa',
    },
  ]);

  const onChangeItemName = (e: React.ChangeEvent<HTMLInputElement>, oldname: string): void => {
    e.preventDefault();
    const newTasks = tasks.map((obj) => {
      if (obj.name === oldname) {
        return Object.assign({}, obj, { name: e.target.value });
      }
      return obj;
    });
    setTasks(newTasks);
  }

  const delItem = (name: string): void => {
    const newTasksList = tasks.filter((e) => e.name !== name);
    setTasks(newTasksList);
  };

  const addToTaskList = (newItem: string): void => {
    setTasks((prevState) => {
      return [...prevState, { name: newItem }];
    });
  }

  return (
    <div>
      {tasks.map((item, index) => {
        return ListItem(index, item.name, onChangeItemName, delItem);
      })}
      {NewTask(addToTaskList)}
    </div>
  );
}
