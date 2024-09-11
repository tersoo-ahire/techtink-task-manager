import { ListItem, IconButton, ListItemText } from "@mui/material";
import { Undo } from "@mui/icons-material";

const SearchItem = ({ task, onEdit }) => {
  return (
    <ListItem
      secondaryAction={
        <>
          <IconButton edge="end" color="info" onClick={() => onEdit(task.id)}>
            <Undo />
          </IconButton>
        </>
      }
    >
      <ListItemText primary={task.text} />
    </ListItem>
  );
};

export default SearchItem;
