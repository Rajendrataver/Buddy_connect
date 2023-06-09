import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Table, { TableColumn } from "react-data-table-component";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Switch } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
interface userInterface {
  first_name: string;
  last_name: string;
  status: string;
  token: string;
  id: number;
  email: string;
  contact: string;
  designation: string;
  role: string;
}

const UserList: React.FC = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [userList, setUserlist] = useState<Array<userInterface>>([]);
  const [data, setData] = useState<Array<userInterface>>([]);
  const [onLoad, setOnLoad] = useState<boolean>(false);
  const getUserList = () => {
    axios({
      method: "get", //you can set what request you want to be
      url: "https://buddy-connect.encoreskydev.com/api/user/users.php",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        setUserlist(res.data.response);
        setData(res.data.response);
        console.log(res.data.response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const singleUser = (id: number) => {
    console.log(id);
  };
  React.useEffect(() => {
    getUserList();
  }, []);
  const handleClick = (id: number, status: string) => {
    setOnLoad(true);
    console.log("Handle Click");
    const token = localStorage.getItem("token");
    if (status === "active") {
      status = "deActive";
    } else {
      status = "active";
    }
    axios({
      url:
        "https://buddy-connect.encoreskydev.com/api/user/userStatus.php?user_id=" +
        id,
      method: "patch",
      data: { status },
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((result) => {
        console.log(result);
        console.log("Handle Click");
        getUserList();
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
      selector: (row: userInterface) => row.first_name,
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
      selector: (row: userInterface) => row.role,
      sortable: true,
    },
    {
      name: <h4>Active</h4>,
      cell: (row: userInterface) => {
        if (row.status === "active")
          return (
            <Switch
              checked
              color="success"
              onClick={() => handleClick(row.id, row.status)}
            />
          );
        else {
          return (
            <Switch
              color="success"
              onClick={() => handleClick(row.id, row.status)}
            />
          );
        }
      },
      sortable: true,
    },

    {
      name: <h4>Deatails</h4>,
      cell: (row: userInterface) => {
        return (
          <Button
            key={row.id}
            color="info"
            variant="contained"
            onClick={() => {
              navigate("/singleuser/" + row.id);
            }}
          >
            Details
          </Button>
        );
      },
      sortable: true,
    },
    {
      name: <h4>Update</h4>,
      cell: (row: userInterface) => {
        return (
          <Button
            key={row.id}
            color="warning"
            variant="outlined"
            onClick={() => {
              navigate("/updateuser/" + row.id);
            }}
          >
            <EditIcon />
          </Button>
        );
      },
      sortable: true,
    },
  ];

  function handleFilter(event: any) {
    const newData = userList.filter((row) => {
      return row.first_name
        .toLocaleLowerCase()
        .includes(event.target.value.toLocaleLowerCase());
    });
    setData(newData);
  }
  return (
    <Paper
      sx={{
        maxWidth: 1100,
        margin: "auto",
        width: 100 + "%",
        marginTop: 5,
        overflow: "hidden",
      }}
    >
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon color="inherit" sx={{ display: "block" }} />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Search Name"
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: "default" },
                }}
                onChange={handleFilter}
                variant="standard"
              />
            </Grid>
            <Grid item>
              <Button variant="contained" sx={{ mr: 1 }}>
                <Link to="/createuser">Crete User</Link>
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Typography sx={{ mx: 2 }} color="text.secondary" align="center">
        <Table
          striped
          className="table"
          pagination
          columns={columns}
          data={data}
          fixedHeader
        />
      </Typography>
    </Paper>
  );
};

export default UserList;
