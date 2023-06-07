import "./index.css";
import { MenuOutlined } from "@mui/icons-material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
const SideBar = () => {
  return (
    <>
      <Sidebar
        // backgroundColor="rgb(0, 249, 249)"
        style={{
          height: "100vh",
          width: 100 + "%",
          maxWidth: 300,
          position: "fixed",
        }}
      >
        <Menu>
          <MenuItem style={{ textAlign: "center" }}>
            <h2>Buddy Connect</h2>
          </MenuItem>{" "}
          <Link to="/dashboard" className="sidebar-link">
            <MenuItem icon={<HomeOutlinedIcon />}>Dashboard</MenuItem>
          </Link>
          <Link to="/createuser" className="sidebar-link">
            <MenuItem icon={<ContactsOutlinedIcon />}>Create New User</MenuItem>
          </Link>
          <Link to="/userlist" className="sidebar-link">
            <MenuItem icon={<ReceiptOutlinedIcon />}>User List</MenuItem>
          </Link>
          <Link to="/dashboard" className="sidebar-link">
            <MenuItem icon={<HelpOutlineOutlinedIcon />}>FAQ</MenuItem>
          </Link>
          <Link to="/logout" className="sidebar-link">
            <MenuItem icon={<CalendarTodayOutlinedIcon />}> Log-out</MenuItem>
          </Link>
        </Menu>
      </Sidebar>
    </>
  );
};

export default SideBar;
