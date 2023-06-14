import "./index.css";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Box, Menu, MenuItem, Toolbar } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { DevicesFoldRounded, MenuOutlined } from "@mui/icons-material";
import LogoutButton from "../logOutButton";
import { boolean } from "yup";
import LogoutIcon from "@mui/icons-material/Logout";
import * as API from "../../apiURL";
const lightColor = "rgba(255, 255, 255, 0.7)";

export default function Header({
  setSidebar,
  toggleSidebar,
}: {
  setSidebar: (boolean: boolean) => void;
  toggleSidebar: boolean;
}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openHamburger, setOpenHamburger] = React.useState<boolean>(false);
  const open = Boolean(anchorEl);

  const toggleHamburger = () => {
    const element = document.getElementById("links");
    if (element) {
      if (!openHamburger) {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    }
    setOpenHamburger(!openHamburger);
  };
  const body = document.querySelector("body");
  if (body) {
    body.addEventListener("wheel", () => {
      const element = document.getElementById("links");
      if (element) {
        element.style.display = "none";
      }
    });
  }

  return (
    <React.Fragment>
      <div className="nav-bar">
        <AppBar
          component="div"
          color="primary"
          elevation={0}
          position="static"
          sx={{ zIndex: 0, padding: 5 + "px" }}
        >
          <Toolbar>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <Typography
                  color="inherit"
                  variant="h5"
                  component="h1"
                  sx={{ cursor: "pointer" }}
                >
                  {<MenuOutlined onClick={() => setSidebar(!toggleSidebar)} />}
                </Typography>
              </Grid>
              <Grid item xs>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive ? "active-link" : "inactive"
                  }
                >
                  DashBoard
                </NavLink>

                <NavLink
                  to="/users"
                  className={({ isActive }) =>
                    isActive ? "active-link" : "inactive"
                  }
                >
                  Users
                </NavLink>
                <NavLink
                  to="/createuser"
                  className={({ isActive }) =>
                    isActive ? "active-link" : "inactive"
                  }
                >
                  Create User
                </NavLink>
                <NavLink
                  to="/formerusers"
                  className={({ isActive }) =>
                    isActive ? "active-link" : "inactive"
                  }
                >
                  Former User
                </NavLink>
              </Grid>

              <Grid
                item
                onClick={(event) => {
                  setAnchorEl(event.currentTarget);
                }}
              >
                <IconButton
                  color="inherit"
                  sx={{ p: 0.5, alignItems: "center" }}
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar
                    src="https://cdn2.vectorstock.com/i/1000x1000/72/96/emotion-avatar-man-happy-successful-face-vector-13577296.jpg"
                    alt="My Avatar"
                  />
                  &nbsp;
                  <Typography
                    sx={{
                      display: "block",
                      textAlign: "left",
                      margin: 0,
                      fontSize: 18 + "px",
                      lineHeight: 0.5,
                    }}
                  >
                    {localStorage.getItem("name")}
                  </Typography>
                </IconButton>
              </Grid>
              <Menu
                id="basic-menu"
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem>
                  <IconButton
                    color="inherit"
                    sx={{ p: 0.5, alignItems: "center" }}
                  >
                    <Avatar
                      src="https://cdn2.vectorstock.com/i/1000x1000/72/96/emotion-avatar-man-happy-successful-face-vector-13577296.jpg"
                      alt="My Avatar"
                    />
                    &nbsp;
                    <Typography
                      sx={{
                        display: "block",
                        textAlign: "left",
                        margin: 0,
                        fontSize: 18 + "px",
                        lineHeight: 0.5,
                      }}
                    >
                      {localStorage.getItem("name")}
                      <Typography sx={{ color: "#00000091", margin: 0 }}>
                        {localStorage.getItem("email")}
                      </Typography>
                    </Typography>
                  </IconButton>
                </MenuItem>
                <hr />
                <MenuItem>
                  &nbsp;&nbsp;
                  <LogoutButton fullWidth={true} />
                </MenuItem>
              </Menu>
            </Grid>
          </Toolbar>

          <Grid container></Grid>
        </AppBar>
      </div>
      <div className="hamburger">
        <AppBar
          component="div"
          color="primary"
          elevation={0}
          position="static"
          sx={{ zIndex: 0, padding: 20 + "px" }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <h2>Buddy Connect</h2>
            <MenuOutlined onClick={toggleHamburger} id="hamburger-icon" />
          </Box>
        </AppBar>
        <div className="links" id="links" onClick={toggleHamburger}>
          <Link to="/dashboard" className="hamburger-link">
            <MenuItem>Dashboard</MenuItem>
          </Link>
          <Link to="/createuser" className="hamburger-link">
            <MenuItem>Create New User</MenuItem>
          </Link>
          <Link to="/userlist" className="hamburger-link">
            <MenuItem>User List</MenuItem>
          </Link>
          <Link to="/removeduserlist" className="hamburger-link">
            <MenuItem>Removed Users</MenuItem>
          </Link>
          <MenuItem>
            <LogoutButton fullWidth={true} />
          </MenuItem>
        </div>
      </div>
      <Grid></Grid>
    </React.Fragment>
  );
}
