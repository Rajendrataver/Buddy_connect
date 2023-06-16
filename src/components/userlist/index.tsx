import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import papa from "papaparse";
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
import PopUp from "../popUp";
import Loader from "../loader";
import ToggelStatus from "../toggelStatus";
import MenuItem from "@mui/material/MenuItem";

interface userInterface {
  first_name: string;
  last_name: string;
  status: string;
  token: string;
  id: string;
  email: string;
  contact: string;
  designation: string;
  role: string;
}

const UserList: React.FC = () => {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [file, setFile] = useState<any>();
  const token = localStorage.getItem("token");
  const [user_id, setuser_id] = useState<string>();
  const [userName, setUserName] = useState<string>();
  const [openUpload, setOpenUpload] = useState<boolean>(false);
  const [userList, setUserlist] = useState<Array<userInterface>>([]);
  const [data, setData] = useState<Array<userInterface>>([]);
  const [onLoad, setOnLoad] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const fetch = useFetch();
  const getUserList = () => {
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
  const handleClick = (id: string, status: string) => {
    setOnLoad(true);

    const token = localStorage.getItem("token");
    if (status === "active") {
      status = "deActive";
    } else {
      status = "active";
    }
    axios({
      url: API.SET_USER_STATUS_URL + id,
      method: "patch",
      data: { status },
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((result) => {
        const newList = userList.map((item) => {
          if (item.id === id) {
            item.status = status;
          }
          return item;
        });
        setUserlist(newList);
      })
      .catch((error) => {
        console.log(error.response);
      })
      .finally(() => {
        setOnLoad(false);
      });
  };
  const columns: TableColumn<userInterface>[] = [
    {
      name: <h4>Name</h4>,
      cell: (row: userInterface) => {
        return (
          <span style={{ textTransform: "capitalize", fontWeight: "bold" }}>
            {row.first_name}
          </span>
        );
      },
      sortable: true,
    },
    {
      name: <h4>Email</h4>,
      selector: (row: userInterface) => row.email,
      sortable: true,
    },

    {
      name: <h4>Designation</h4>,
      selector: (row: userInterface) => row.designation,
      sortable: true,
    },
    {
      name: <h4>Role</h4>,
      cell: (row: userInterface) => {
        return <span style={{ textTransform: "capitalize" }}>{row.role}</span>;
      },
      sortable: true,
    },
    {
      name: <h4>Active</h4>,
      cell: (row: userInterface) => {
        return <ToggelStatus status={row.status} id={row.id} />;
      },
    },
    {
      name: <h4>Update</h4>,
      cell: (row: userInterface) => {
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
      name: <h4>Remove</h4>,
      cell: (row: userInterface) => {
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
      name: <h4>Deatails</h4>,
      cell: (row: userInterface) => {
        return (
          <Link to={"/user/" + row.id}>
            <Button key={row.id} fullWidth color="info" variant="contained">
              Details
            </Button>
          </Link>
        );
      },
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
  const [filedata, setFileData] = useState<any>([]);
  const uploadFile = () => {
    const reader = new FileReader();

    // Event listener on reader when the file
    // loads, we parse it and set the data.
    papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        setFileData(results.data);
      },
    });

    setOpenUpload(false);
  };
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const extension = file.name.split(".").pop();
      if (extension === "csv") {
        setFile(file);
        setOpenUpload(true);
      } else {
        setOpenAlert(true);
      }
    }
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
      <ConfirmBox
        msg={"Upload  File ?"}
        open={openUpload}
        handleOk={uploadFile}
        setOpen={setOpenUpload}
      />
      <Loader open={loading} />
      <ConfirmBox
        msg={"Do you want to Delete " + userName + " ?"}
        open={open}
        handleOk={deletUser}
        setOpen={setOpen}
      />
      {openAlert && (
        <PopUp
          msg="Invalid File Type Select CSV file"
          setOpenAlert={setOpenAlert}
        />
      )}
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
            <Grid
              container
              alignItems="center"
              spacing={1}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Grid item md={6} sm={6} xs={12}>
                <Typography
                  sx={{ display: "block", ml: 4, mt: 2, fontSize: 32 }}
                >
                  Users
                </Typography>
              </Grid>
              <Grid
                item
                md={6}
                sm={6}
                xs={12}
                textAlign={{ md: "right", sm: "right", xs: "left" }}
              >
                <Button
                  sx={{ ta: "center", bgcolor: "primary" }}
                  variant="outlined"
                >
                  <label style={{ textAlign: "center" }}>
                    Upload File
                    <input
                      type="file"
                      title="Upload File"
                      alt="Upload File"
                      accept=".csv"
                      className="file-ipload-input"
                      onChange={(e) => handleFileChange(e)}
                    />
                  </label>
                </Button>

                <Button variant="contained" sx={{ ml: 1 }}>
                  <Link to="/createuser">Create User</Link>
                </Button>
              </Grid>
              <Grid
                item
                sm={12}
                md={8.9}
                xs={12}
                display={"flex"}
                alignItems={"center"}
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
              </Grid>
              <Grid item md={3.1} sm={12} xs={12} mb={1}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                    onChange={(e) => handleRoleChange(e.target.value)}
                  >
                    <MenuItem value="Select" defaultChecked>
                      Select
                    </MenuItem>
                    {SELECT.ROLES.map((role, i) => {
                      return (
                        <MenuItem
                          value={role}
                          key={i}
                          sx={{ textTransform: "capitalize" }}
                        >
                          {role}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
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
