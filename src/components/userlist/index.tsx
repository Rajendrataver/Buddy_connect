import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import Table, { TableColumn } from "react-data-table-component";
import { useState } from "react";
import axios from "axios";
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
  const [userList, setUserlist] = useState<Array<userInterface>>([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState<Array<userInterface>>([]);

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
        getUserList();
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const columns: TableColumn<userInterface>[] = [
    {
      name: "Name",
      selector: (row: userInterface) => row.first_name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: userInterface) => row.email,
      sortable: true,
    },

    {
      name: "Designaion",
      selector: (row: userInterface) => row.designation,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row: userInterface) => row.role,
      sortable: true,
    },
    {
      name: "Details",
      cell: (row: userInterface) => {
        return (
          <button
            className="action-btn btn-info"
            onClick={() => singleUser(row.id)}
          >
            User Details
          </button>
        );
      },
      sortable: true,
    },
    {
      name: "Action",
      cell: (row: userInterface) => {
        if (row.status === "active")
          return (
            <Button
              variant="contained"
              color="warning"
              onClick={() => handleClick(row.id, row.status)}
            >
              Deactivate
            </Button>
          );
        else {
          return (
            <Button
              variant="contained"
              color="success"
              onClick={() => handleClick(row.id, row.status)}
            >
              Activate
            </Button>
          );
        }
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
        maxWidth: 65 + "%",
        margin: "auto",
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
                Add user
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Typography sx={{ mx: 2 }} color="text.secondary" align="center">
        <Table
          striped
          className="table"
          title={"User List"}
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
