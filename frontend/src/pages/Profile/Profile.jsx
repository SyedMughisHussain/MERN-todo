import { useState, useEffect } from "react";
import {
  CircularProgress,
  Box,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import axios from "axios";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
  });
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProfile(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Error: " + error);
      });

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="70vh"
    >
      <Paper
        elevation={3}
        sx={{
          padding: "2rem",
          borderRadius: "1rem",
          maxWidth: "400px",
          width: "100%",
          backgroundColor: "#ffffff",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          align="center"
          sx={{ fontWeight: "bold", color: "#3f51b5" }}
        >
          Profile Page
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "1.5rem",
          }}
        >
          <Box>
            <Typography variant="subtitle1" sx={{ color: "#888" }}>
              Name:
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: "500", color: "#333" }}>
              {profile.name}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ color: "#888" }}>
              Email:
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: "500", color: "#333" }}>
              {profile.email}
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1976D2",
              color: "#fff",
              textTransform: "none",
              marginTop: "1.5rem",
            }}
            onClick={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 2000);
            }}
          >
            Reload
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;
