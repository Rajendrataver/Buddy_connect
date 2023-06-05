import "./index.css";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import HelpIcon from "@mui/icons-material/Help";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import { MenuOutlined } from "@mui/icons-material";
const lightColor = "rgba(255, 255, 255, 0.7)";

export default function Header({
  setSidebar,
  toggleSidebar,
}: {
  setSidebar: (boolean: boolean) => void;
  toggleSidebar: boolean;
}) {
  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}></AppBar>
      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{ zIndex: 0, padding: 5 + "px" }}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                {<MenuOutlined onClick={() => setSidebar(!toggleSidebar)} />}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                sx={{ borderColor: lightColor }}
                variant="outlined"
                color="inherit"
                size="small"
              >
                <Link to={"/logout"}>Log-Out</Link>
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
        <hr />
        <Grid container>
          <Grid item>
            <Link to="/dahsboard" className="nav-links">
              Dashboard
            </Link>
            <Link to="/userlist" className="nav-links">
              User List
            </Link>
            <Link to="/createuser" className="nav-links">
              Create User
            </Link>
          </Grid>
        </Grid>
      </AppBar>
    </React.Fragment>
  );
}
