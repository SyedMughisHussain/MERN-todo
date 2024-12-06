import { Box } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoutes(props) {
  const { component } = props;

  const [loader, setLoader] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setLoader(true);
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
    setLoader(false);
  }, []);
  return (
    <>
      {loader ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "15%" }}>
          <CircularProgress />
        </Box>
      ) : (
        component
      )}
    </>
  );
}

export default ProtectedRoutes;
