"use client";
import { useState, useEffect } from "react";
import { Container, Typography, List, Box } from "@mui/material";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import SearchForm from "./components/SearchForm";
import SearchItem from "./components/SearchItem";
import { format } from "date-fns";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskText) => {
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      completedAt: null,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? new Date().toISOString() : null,
            }
          : task
      )
    );
  };

  const editTask = (taskId) => {
    const newText = prompt("Edit task");
    if (newText) {
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, text: newText } : task
        )
      );
    }
  };

  const undoTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: false, completedAt: null }
          : task
      )
    );
  };

  const formatCompletionDate = (dateString) => {
    return format(new Date(dateString), "yyyy-MM-dd HH:mm");
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredCompletedTasks = tasks
    .filter((task) => task.completed)
    .filter((task) =>
      task.text.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <Container maxWidth="lg" sx={{ paddingTop: "40px", paddingBottom: "50px" }}>
      <Typography variant="h3" align="center" gutterBottom>
        Task Manager
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row", },
          gap: 4,
        }}
      >
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#F5F5F5",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 11px 15px rgba(0, 0, 0, 0.2)",
            height: "500px",
            overflowY: "auto",
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Pending Tasks
          </Typography>
          <TaskForm onAdd={addTask} />
          <List>
            {tasks
              .filter((task) => !task.completed)
              .map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onDelete={deleteTask}
                  onComplete={toggleComplete}
                  onEdit={editTask}
                />
              ))}
          </List>
        </Box>

        <Box
          sx={{
            flex: 1,
            backgroundColor: "#E0F7FA",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 11px 15px rgba(0, 0, 0, 0.2)",
            height: "500px",
            overflowY: "auto",
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Completed Tasks
          </Typography>
          <SearchForm
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
          <List>
            {filteredCompletedTasks.map((task) => (
              <SearchItem
                key={task.id}
                task={task}
                onUndo={undoTask}
                completionTime={formatCompletionDate(task.completedAt)}
              />
            ))}
          </List>
        </Box>
      </Box>
    </Container>
  );
}
