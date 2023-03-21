import React from 'react';
import { List, ListItem, InputBase, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
  task: {
    id: number,
    name: string
  }
  onChangeItemName: (e: React.ChangeEvent<HTMLInputElement>, oldId: number) => void;
  delItem: (id: number) => void;
}

export default function TaskListItem(params: Props) {
  const { task, onChangeItemName, delItem } = params;
  const inputRef: React.RefObject<HTMLInputElement> = React.createRef();

  const handleDelete = (e: React.MouseEvent): void => {
    e.preventDefault();
    delItem(task.id);
  };

  return (
    <List key={task.id}>
      <ListItem disablePadding className="rounded-lg hover:bg-gray-100 py-2">
        <InputBase
          ref={inputRef}
          value={task.name}
          fullWidth
          className="pl-4"
          onChange={(e) => onChangeItemName(e as React.ChangeEvent<HTMLInputElement>, task.id)}
        ></InputBase>
        <IconButton sx={{marginRight: "16px"}} aria-label="delete" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
    </List>
  );
}
