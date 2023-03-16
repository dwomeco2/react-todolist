import React, { useState } from 'react';
import './style.css';

function ListItem(name, onChangeItemName, delItemFn) {
  const inputRef = React.createRef(null);

  const handleDelete = (e) => {
    e.preventDefault();
    delItemFn(name);
  };

  return (
    <div>
      <input
        ref={inputRef}
        value={name}
        onChange={(e) => onChangeItemName(name, e.target.value)}
      ></input>
      <a href="#" onClick={handleDelete}>
        Del
      </a>
    </div>
  );
}

function NewTask(addToTaskList) {
  const [newTask, setNewTask] = useState('');

  function onKeyPressed(e) {
    if (e.keyCode === 13) {
      // Enter
      onClickAdded();
    }
  }

  function onClickAdded() {
    if (newTask != '') {
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
      <a href="#" onClick={onClickAdded}>
        Add
      </a>
    </>
  );
}

export default function App() {
  const [tasks, setTasks] = useState([
    {
      name: 'aaa',
    },
  ]);

  function onChangeItemName(oldname, newName) {
    const newTasks = tasks.map((obj) => {
      if (obj.name == oldname) {
        return Object.assign({}, obj, { name: newName });
      }
      return obj;
    });
    setTasks(newTasks);
  }

  const delItemFn = function (name) {
    let newTasksList = tasks.filter((e) => e.name != name);
    setTasks(newTasksList);
  };

  function addToTaskList(newItem) {
    setTasks((prevState) => {
      return [...prevState, { name: newItem }];
    });
  }

  return (
    <div>
      {tasks.map((item) => {
        return ListItem(item.name, onChangeItemName, delItemFn);
      })}
      {NewTask(addToTaskList)}
    </div>
  );
}
