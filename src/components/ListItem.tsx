import React from 'react';

export default function ListItem(index: number, name: string, onChangeItemName: (e: React.ChangeEvent<HTMLInputElement>, oldname: string) => void , delItem: (name: string) => void) {
  const inputRef: React.RefObject<HTMLInputElement> = React.createRef();

  const handleDelete = (e: React.MouseEvent): void => {
    e.preventDefault();
    delItem(name);
  };

  return (
    <div>
      <input
        ref={inputRef}
        key={index}
        value={name}
        onChange={(e) => onChangeItemName(e, name)}
      ></input>
      <span onClick={handleDelete}>
        Del
      </span>
    </div>
  );
}
