import "./index.css";
import { Route, Routes, useNavigate } from "react-router";
import Header from "../Header";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import SideBar from "../sidebar";
import routes from "../../appLinks/routes";

const Content = () => {
  const [toggleSidebar, setSidebar] = useState(true);
  const navigate = useNavigate();
  var className = "block";
  if (!toggleSidebar) {
    className = "none";
  }
  useEffect(() => {
    if (
      !localStorage.getItem("token") &&
      localStorage.getItem("role") !== "superAdmin"
    ) {
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
          {routes.map((item, i) => {
            return <Route path={item.path} key={i} element={item.element} />;
          })}
        </Routes>
      </Box>
    </Box>
  );
};
export default Content;
