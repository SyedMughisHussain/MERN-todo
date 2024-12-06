import React from "react";
import { Routes, Route } from "react-router-dom";
import Drawer from "../../components/DrawerComponents/Drawer.jsx";

import Home from "./Home.jsx";
import Profile from "./Profile.jsx";
import Settings from "./Settings.jsx";

const Dashboard = () => {
  return (
    <>
      <Drawer
        screen={
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/allCourses" element={<Profile />} />
            <Route path="/allStudents" element={<Settings />} />
            {/* <Route path="/allCourses/:id" element={<SingleCourse />}/> */}
          </Routes>
        }
      />
    </>
  );
};

export default das;