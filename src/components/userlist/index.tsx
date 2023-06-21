import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import SyncIcon from "@mui/icons-material/Sync";
import * as SELECT from "../../selectListCollection";
import {
  AppBar,
  Toolbar,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Table, { TableColumn } from "react-data-table-component";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmBox from "../confirmBox";
import useFetch from "../../customHook/useFetch";
import * as API from "../../apiURL";
import Loader from "../loader";
import ToggelStatus from "../toggelStatus";
import MenuItem from "@mui/material/MenuItem";
import UploadFileButton from "../uploadFileButton";
import userDetails from "../../InterFaces";

const UserList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const token = localStorage.getItem("token");
  const [user_id, setuser_id] = useState<string>();
  const [userName, setUserName] = useState<string>();
  const [openUpload, setOpenUpload] = useState<boolean>(false);
  const [userList, setUserlist] = useState<Array<userDetails>>([]);
  const [data, setData] = useState<Array<userDetails>>([]);
  const [onLoad, setOnLoad] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const fetch = useFetch();
  const getUserList = () => {
    setLoading(true)
    const response = fetch(API.GET_USERS_URL, "get", token);
    response.then((res) => {
      setUserlist(res.data.response);
      setData(res.data.response);
    });
    response
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getUserList();
  }, []);

  const columns: TableColumn<userDetails>[] = [
    {
      name: "Name",
      cell: (row: userDetails) => {
        return (
          <span style={{ textTransform: "capitalize", fontWeight: "bold" }}>
            {row.first_name}
          </span>
        );
      },
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: userDetails) => row.email,
      sortable: true,
    },

    {
      name: "Designation",
      selector: (row: userDetails) => row.designation,
      sortable: true,
    },
    {
      name: "Role",
      cell: (row: userDetails) => {
        return <span style={{ textTransform: "capitalize" }}>{row.role}</span>;
      },
      sortable: true,
    },
    {
      name: "Active",
      cell: (row: userDetails) => {
        return <ToggelStatus status={row.status} id={row.id} />;
      },
    },
    {
      name: "Update",
      cell: (row: userDetails) => {
        return (
          <Link to={"/updateuser/" + row.id}>
            <Button key={row.id} color="primary" variant="outlined">
              <EditIcon />
            </Button>
          </Link>
        );
      },
    },
    {
      name: "Remove",
      cell: (row: userDetails) => {
        return (
          <Button
            key={row.id}
            color="error"
            variant="outlined"
            disabled={onLoad}
          >
            <DeleteIcon
              color="error"
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setOpen(true);
                setuser_id(row.id);
                setUserName(row.first_name + " " + row.last_name);
              }}
            />
          </Button>
        );
      },
    },
    {
      name: "Deatails",
      cell: (row: userDetails) => {
        return (
          <Link to={"/user/" + row.id}>
            <Button key={row.id} fullWidth color="info" variant="contained">
              Details
            </Button>
          </Link>
        );
      },
      style: { padding: 0 },
    },
  ];

  const deletUser = () => {
    setOnLoad(true);
    const response = fetch(API.DELTE_USER_URL + user_id, "delete", token);
    response
      .then((res) => {
        getUserList();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setOpen(false);
        setOnLoad(false);
      });
  };

  function handleFilter(event: any) {
    const newData = userList.filter((row) => {
      return row.first_name
        .toLocaleLowerCase()
        .includes(event.target.value.toLocaleLowerCase());
    });
    setData(newData);
  }
  const handleRoleChange = (role: any) => {
    if (role !== "Select") {
      const newData = userList.filter((row) => {
        return row.role === role;
      });
      setData(newData);
    } else {
      setData(userList);
    }
  };
  return (
    <Box className={"container"}>
      <Loader open={loading} />
      <ConfirmBox
        msg={"Do you want to Delete " + userName + " ?"}
        open={open}
        handleOk={deletUser}
        handleClose={() => setOpen(false)}
      />

      <Paper
        className="userlist-section"
        sx={{
          maxWidth: 1200,
          margin: "auto",
          width: 100 + "%",
          marginTop: 5,
          mb: 5,
          overflow: "hidden",
        }}
      >
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
        >
          {" "}
          <Toolbar>
            <Grid container alignItems="center" spacing={1} display={"flex"}>
              <Grid item md={12} sm={12} xs={12}>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontFamily: "sans-serif",
                    mt: 2,
                    ml: 2,
                    fontSize: 30,
                  }}
                >
                  Users
                </Typography>
              </Grid>
              <Grid container>
                <Grid
                  item
                  sm={12}
                  md={5}
                  xs={12}
                  display={"flex"}
                  alignItems={"center"}
                  mb={1}
                >
                  <SearchIcon color="inherit" sx={{ display: "block" }} />
                  <TextField
                    fullWidth
                    placeholder="Search Name"
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        fontSize: 18,
                        borderBottom: " 0.5px solid gray",
                        pl: 1,
                      },
                    }}
                    onChange={handleFilter}
                    variant="standard"
                  />

                  <SyncIcon
                    sx={{ fontSize: 35, cursor: "pointer" }}
                    color={"primary"}
                    onClick={() => getUserList()}
                  />
                </Grid>
                <Grid
                  item
                  md={7}
                  sm={12}
                  xs={12}
                  mb={1}
                  display={"flex"}
                  justifyContent={{
                    md: "flex-end",
                    sm: "flex-start",
                    xs: "flex-start",
                  }}
                  flexWrap={"wrap"}
                >
                  <FormControl
                    sx={{
                      width: 170,
                      mr: 1,
                    }}
                    size="small"
                    color="primary"
                  >
                    <InputLabel id="demo-simple-select-label" color="primary">
                      Role
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Age"
                      color="primary"
                      onChange={(e) => handleRoleChange(e.target.value)}
                    >
                      <MenuItem defaultChecked color="primary">
                        Select
                      </MenuItem>
                      {SELECT.ROLES.map((role, i) => {
                        return (
                          <MenuItem
                            value={role}
                            key={i}
                            color="primary"
                            sx={{ textTransform: "capitalize" }}
                          >
                            {role}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                  <UploadFileButton />
                  <Button variant="contained" sx={{ ml: 1 }}>
                    <Link to="/createuser">Create User</Link>
                  </Button>
                </Grid>
              </Grid>

              <Grid></Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Typography sx={{ mx: 2 }} color="text.secondary" align="center">
          <Table
            striped
            className="table"
            columns={columns}
            data={data}
            pagination
          />
        </Typography>
      </Paper>
    </Box>
  );
};

export default UserList;
