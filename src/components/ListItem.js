import React from 'react';

export default function ListItem(name, onChangeItemName, delItem) {
  const inputRef = React.createRef(null);

  const handleDelete = (e) => {
    e.preventDefault();
    delItem(name);
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
