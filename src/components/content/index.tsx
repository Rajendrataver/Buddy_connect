import "./index.css";
import { Route, Routes, useNavigate } from "react-router";

import Header from "../Header";
import { useEffect, useState } from "react";
import UserList from "../userlist";
import Dashboard from "../dashboard";
import CreateUser from "../creatUser";
import Logout from "../logout";
import SingleUser from "../singleUser";
import { Box } from "@mui/material";
import SideBar from "../sidebar";
import AddBankDetails from "../addBankDetails";
import AddFamilyDetail from "../addFamilyDetails";
import AddSalaryDetails from "../addSalaryDetails";
const Content = () => {
  const [toggleSidebar, setSidebar] = useState(true);
  const navigate = useNavigate();
  var className = "block";
  if (!toggleSidebar) {
    className = "none";
  }
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      console.log(localStorage.getItem("token"));

      navigate("/");
    }
  });
  return (
    <Box sx={{ display: "flex" }}>
      <Box className={className}>
        <SideBar />
      </Box>
      <Box
        className={className}
        style={{
          height: "100vh",
          width: 100 + "%",
          maxWidth: 250,
          minWidth: 250,
        }}
      ></Box>
      <Box sx={{ width: 100 + "%" }}>
        <Header setSidebar={setSidebar} toggleSidebar={toggleSidebar} />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/userlist" element={<UserList />} />
          <Route path="/createuser" element={<CreateUser />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/singleuser/:id" element={<SingleUser />} />
          <Route
            path="/add-bank-details/:user_id"
            element={<AddBankDetails />}
          />
          <Route
            path="/add-family-details/:user_id"
            element={<AddFamilyDetail />}
          />
          <Route
            path="/add-salary-details/:user_id"
            element={<AddSalaryDetails />}
          />
        </Routes>
      </Box>
    </Box>
  );
};
export default Content;
