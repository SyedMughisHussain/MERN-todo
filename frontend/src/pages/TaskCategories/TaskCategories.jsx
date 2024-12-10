import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function TaskCategories() {
  const [categories, setCategories] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  const handleOpen = (type, category = null) => {
    setModalType(type);
    setSelectedCategory(category);
    setCategoryName(category?.name || "");
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
    setCategoryName("");
    setSelectedCategory(null);
  };

  const handleCreate = () => {
    axios
      .post(
        "http://localhost:3000/api/v1/category/createCategory",
        {
          name: categoryName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setCategories([...categories, response.data.category]);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
    handleClose();
  };

  const handleEdit = () => {
    axios
      .put(
        `http://localhost:3000/api/v1/category/updateCategory/${selectedCategory._id}`,
        {
          name: categoryName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        // Update the category in the local state by comparing _id
        setCategories(
          categories.map((cat) =>
            cat._id === selectedCategory._id ? { ...cat, name: categoryName } : cat
          )
        );
      })
      .catch((error) => {
        console.log("Error:", error);
      });
    handleClose();
  };

  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:3000/api/v1/category/deleteCategory/${id}`)
      .then((response) => {
        console.log(response.data);
        setCategories(categories.filter((category) => category._id !== id));
      })
      .catch((error) => {
        console.log("Error: " + error.message);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoading(true);
    setTimeout(() => {
      axios
        .get("http://localhost:3000/api/v1/category/getCategories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setCategories(response.data.categories);
          console.log(response.data.categories);
        })
        .catch((error) => {
          console.log("Error:", error);
        })
        .finally(() => setLoading(false));
    }, 1000);
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Task Categories
      </Typography>

      <Button variant="contained" color="primary" onClick={() => handleOpen("create")}>
        Create Category
      </Button>

      <List sx={{ mt: 4 }}>
        {categories.map((category) => (
          <ListItem key={category.id} sx={{ borderBottom: "1px solid #ddd" }}>
            <ListItemText primary={category.name} />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleOpen("edit", category)}>
                <Edit />
              </IconButton>
              <IconButton
                edge="end"
                color="error"
                onClick={() => {
                  deleteTodo(category._id);
                }}
              >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <Modal open={openModal} onClose={handleClose}>
        <Box sx={style}>
          {modalType === "create" && (
            <>
              <Typography variant="h6">Create Category</Typography>
              <TextField fullWidth margin="normal" label="Category Name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
              <Button variant="contained" color="primary" onClick={handleCreate} fullWidth>
                Create
              </Button>
            </>
          )}

          {modalType === "edit" && (
            <>
              <Typography variant="h6">Edit Category</Typography>
              <TextField fullWidth margin="normal" label="Category Name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
              <Button variant="contained" color="primary" onClick={handleEdit} fullWidth>
                Save Changes
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
