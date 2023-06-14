import "./index.css";
import { Route, Routes, useNavigate } from "react-router";

import Header from "../Header";
import { useEffect, useState } from "react";
import UserList from "../userlist";
import Dashboard from "../dashboard";
import CreateUser from "../creatUser";
import User from "../user";
import { Box } from "@mui/material";
import SideBar from "../sidebar";
import AddBankDetails from "../addBankDetails";
import AddSalaryDetails from "../addSalaryDetails";
import UpdateUser from "../updateUserDetails";
import FormerUsers from "../formerUsers";
import UnkonownPage from "../404";
const Content = () => {
  const [toggleSidebar, setSidebar] = useState(true);
  const navigate = useNavigate();
  var className = "block";
  if (!toggleSidebar) {
    className = "none";
  }
  useEffect(() => {
    if (!localStorage.getItem("token")) {
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
          <Route path="/users" element={<UserList />} />
          <Route path="/createuser" element={<CreateUser />} />
          <Route path="/user/:id" element={<User />} />
          <Route
            path="/add-bank-details/:user_id"
            element={<AddBankDetails />}
          />
          <Route
            path="/add-salary-details/:user_id"
            element={<AddSalaryDetails />}
          />
          <Route path="/updateuser/:id" element={<UpdateUser />} />
          <Route path="/formerusers" element={<FormerUsers />} />
          <Route path="*" element={<UnkonownPage />}></Route>
        </Routes>
      </Box>
    </Box>
  );
};
export default Content;
