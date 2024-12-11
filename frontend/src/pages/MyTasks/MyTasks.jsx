import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Not Started",
    priority: "Low",
    category: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleAddTask = () => {
    if (editIndex !== null) {
      const taskId = tasks[editIndex]._id;
      axios
        .put(`https://mern-todo-steel.vercel.app/api/v1/todo/updateTodoById/${taskId}`, {
          title: form.title,
          description: form.description,
          status: form.status,
          priority: form.priority,
          category: form.category,
        })
        .then((response) => {
          console.log(response.data);
          const updatedTasks = tasks.map((task, index) => (index === editIndex ? form : task));
          setTasks(updatedTasks);
          setEditIndex(null);
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    } else {
      axios
        .post(
          "https://mern-todo-steel.vercel.app/api/v1/todo/createTodo",
          {
            title: form.title,
            description: form.description,
            status: form.status,
            priority: form.priority,
            category: form.category,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          setTasks([...tasks, response.data.todo]);
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
      setTasks([...tasks, form]);
    }
    setForm({ title: "", description: "", status: "Not Started", priority: "Low", category: "" });
  };

  const handleEditTask = (index, id) => {
    setForm(tasks[index]);
    setEditIndex(index);
    return id;
  };

  const handleDeleteTask = (index, id) => {
    axios
      .delete(`https://mern-todo-steel.vercel.app/api/v1/todo/deleteTodo/${id}`)
      .then((response) => {
        console.log(response.data);
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  };

  useEffect(() => {
    axios
      .get("https://mern-todo-steel.vercel.app/api/v1/todo/getTodos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setTasks(response.data.todos);
      })
      .catch((error) => {
        console.log("Error:", error);
      });

    axios
      .get("https://mern-todo-steel.vercel.app/api/v1/category/getCategories", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.log("Error fetching categories:", error);
      });
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Task Manager
      </Typography>

      <Paper style={{ padding: 16, marginBottom: 16 }}>
        <Typography variant="h6" gutterBottom>
          {editIndex !== null ? "Edit Task" : "Add Task"}
        </Typography>
        <TextField fullWidth label="Title" name="title" value={form.title} onChange={handleInputChange} margin="normal" />
        <TextField fullWidth label="Description" name="description" value={form.description} onChange={handleInputChange} margin="normal" />
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select name="status" value={form.status} onChange={handleInputChange}>
            <MenuItem value="Not Started">Not Started</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Priority</InputLabel>
          <Select name="priority" value={form.priority} onChange={handleInputChange}>
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Moderate">Moderate</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select name="category" value={form.category} onChange={handleInputChange}>
            {categories.map((category) => (
              <MenuItem key={category._id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleAddTask} style={{ marginTop: 16 }}>
          {editIndex !== null ? "Update Task" : "Add Task"}
        </Button>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task, index) => (
              <TableRow key={index}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>{task.category}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditTask(index, task._id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDeleteTask(index, task._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default MyTasks;
