import { useState } from "react";
import {
  ListItem,
  IconButton,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Tooltip,
} from "@mui/material";
import { Undo } from "@mui/icons-material";

const SearchItem = ({ task, onUndo, completionTime }) => {
  const [open, setOpen] = useState(false);

  const handleUndoClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirmUndo = () => {
    onUndo(task.id);
    setOpen(false);
  };

  return (
    <>
      <ListItem
        secondaryAction={
          <>
            <Tooltip title="Undo Task" arrow>
              <IconButton edge="end" color="info" onClick={handleUndoClick}>
                <Undo />
              </IconButton>
            </Tooltip>
          </>
        }
      >
        <ListItemText
          primary={
            <>
              <ul style={{ paddingLeft: "20px" }}>
                <li>
                  <span style={{ fontWeight: "bold" }}>{task.text} - </span>
                  <span style={{ fontStyle: "italic" }}>
                    Completed at {completionTime}
                  </span>
                </li>
              </ul>
            </>
          }
        />
      </ListItem>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Undo Task Completion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to undo this task? It will be moved back to
            pending tasks.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmUndo} color="error">
            Confirm Undo
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SearchItem;
