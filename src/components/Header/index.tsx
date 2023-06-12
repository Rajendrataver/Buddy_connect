import "./index.css";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Box, Menu, MenuItem, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import { MenuOutlined } from "@mui/icons-material";
import LogoutButton from "../logOutButton";
import { boolean } from "yup";
const lightColor = "rgba(255, 255, 255, 0.7)";

export default function Header({
  setSidebar,
  toggleSidebar,
}: {
  setSidebar: (boolean: boolean) => void;
  toggleSidebar: boolean;
}) {
  const [openHamburger, setOpenHamburger] = React.useState<boolean>(false);
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
      console.log("calling");
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
                <Link to="/dashboard" className="nav-links">
                  Dashboard
                </Link>
                <Link to="/userlist" className="nav-links">
                  User List
                </Link>
                <Link to="/createuser" className="nav-links">
                  Create User
                </Link>
              </Grid>
              <Grid item>
                <Button
                  sx={{ borderColor: lightColor }}
                  variant="outlined"
                  color="inherit"
                  size="small"
                >
                  <LogoutButton />
                </Button>
              </Grid>

              <Grid item>
                <IconButton color="inherit" sx={{ p: 0.5 }}>
                  <Avatar
                    src="https://cdn2.vectorstock.com/i/1000x1000/72/96/emotion-avatar-man-happy-successful-face-vector-13577296.jpg"
                    alt="My Avatar"
                  />
                </IconButton>
              </Grid>
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
         
          <MenuItem>
            <LogoutButton fullWidth={true} />
          </MenuItem>
          <Link to="/removeduserlist" className="hamburger-link">
            <MenuItem>Removed Users</MenuItem>
          </Link>
        </div>
      </div>
      <Grid></Grid>
    </React.Fragment>
  );
}
