import "./index.css";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Box, Menu, MenuItem, Toolbar } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { MenuOutlined } from "@mui/icons-material";
import LogoutButton from "../logOutButton";
import * as API from "../../apiURL";
import links from "../../appLinks";

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
                {links.map((item, i) => {
                  return (
                    <NavLink
                      key={i}
                      to={item.url}
                      className={({ isActive }) =>
                        isActive ? "active-link" : "inactive"
                      }
                    >
                      {item.title}
                    </NavLink>
                  );
                })}
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
                    src={API.LOGIN_USER_DEFAULT_AVATAR_URL}
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
            <span
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <MenuOutlined onClick={toggleHamburger} id="hamburger-icon" />
              &nbsp;&nbsp;<h2>Buddy Connect</h2>
            </span>

            <LogoutButton />
          </Box>
        </AppBar>
        <div className="links" id="links" onClick={toggleHamburger}>
          <Link to="/dashboard" className="hamburger-link">
            <MenuItem>Dashboard</MenuItem>
          </Link>
          <Link to="/users" className="hamburger-link">
            <MenuItem>Users</MenuItem>
          </Link>
          <Link to="/createuser" className="hamburger-link">
            <MenuItem>Create User</MenuItem>
          </Link>
          <Link to="/formerusers" className="hamburger-link">
            <MenuItem>Former Users</MenuItem>
          </Link>
        </div>
      </div>
      <Grid></Grid>
    </React.Fragment>
  );
}
