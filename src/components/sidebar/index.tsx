import "./index.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, NavLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import LogoutButton from "../logOutButton";
const SideBar = () => {
  return (
    <>
      <Sidebar
        // backgroundColor="rgb(0, 249, 249)"
        style={{
          height: "100vh",
          width: 100 + "%",
          maxWidth: 250,
          position: "fixed",
        }}
      >
        <Menu>
          <MenuItem style={{ textAlign: "center" }}>
            <h2>Buddy Connect</h2>
          </MenuItem>{" "}
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "sidebar-link-active" : "sidebar-link"
            }
          >
            <MenuItem icon={<HomeOutlinedIcon sx={{ fontSize: 33 }} />}>
              Dashboard
            </MenuItem>
          </NavLink>
          <NavLink
            to="/createuser"
            className={({ isActive }) =>
              isActive ? "sidebar-link-active" : "sidebar-link"
            }
          >
            <MenuItem icon={<ContactsOutlinedIcon />}>Create New User</MenuItem>
          </NavLink>
          <NavLink
            to="/userlist"
            className={({ isActive }) =>
              isActive ? "sidebar-link-active" : "sidebar-link"
            }
          >
            <MenuItem icon={<ReceiptOutlinedIcon />}>User List</MenuItem>
          </NavLink>
          <NavLink
            to="/removeduserlist"
            className={({ isActive }) =>
              isActive ? "sidebar-link-active" : "sidebar-link"
            }
          >
            <MenuItem icon={<PersonOffIcon />}>Removed Users</MenuItem>
          </NavLink>
          <MenuItem icon={<LogoutIcon />}>
            <LogoutButton fullWidth={true} />
          </MenuItem>
        </Menu>
      </Sidebar>
    </>
  );
};

export default SideBar;
