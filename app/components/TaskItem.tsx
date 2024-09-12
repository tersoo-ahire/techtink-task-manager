import { ListItem, IconButton, ListItemText, Tooltip } from "@mui/material";
import { Delete, Edit, CheckCircle } from "@mui/icons-material";

const TaskItem = ({ task, onDelete, onComplete, onEdit }) => {
  return (
    <ListItem
      secondaryAction={
        <>
          <Tooltip title="Edit Task" arrow>
            <IconButton edge="end" color="info" onClick={() => onEdit(task.id)}>
              <Edit />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete Task" arrow>
            <IconButton
              edge="end"
              color="error"
              onClick={() => onDelete(task.id)}
            >
              <Delete />
            </IconButton>
          </Tooltip>

          <Tooltip title="Complete Task" arrow>
            <IconButton
              edge="end"
              color="success"
              onClick={() => onComplete(task.id)}
            >
              <CheckCircle />
            </IconButton>
          </Tooltip>
        </>
      }
    >
      <ListItemText
        primary={
          <>
            <ul style={{ paddingLeft: "20px" }}>
              <li style={{ fontWeight: "bold" }}>{task.text}</li>
            </ul>
          </>
        }
      />
    </ListItem>
  );
};

export default TaskItem;
