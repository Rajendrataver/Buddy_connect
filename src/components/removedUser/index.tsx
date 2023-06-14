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
import useFetch from "../../customHook/useFetch";
import * as API from "../../apiURL";
import { Box } from "@mui/material";
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

const RemovedUser: React.FC = () => {
  const token = localStorage.getItem("token");
  const [userList, setUserlist] = useState<Array<userInterface>>([]);
  const [data, setData] = useState<Array<userInterface>>([]);
  const fetch = useFetch();
  const getUserList = () => {
    const response = fetch(API.GET_REMOVED_USERS_URL, "get", token);
    response.then((res) => {
      setUserlist(res.data.response);
      setData(res.data.response);
    });
    response.catch((error) => {
      console.log(error);
    });
  };

  React.useEffect(() => {
    getUserList();
  }, []);

  const columns: TableColumn<userInterface>[] = [
    {
      name: <h4>S.No</h4>,
      selector: (row: userInterface) => {
        return data.indexOf(row) + 1;
      },
    },
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
    <Box className="container">
      <Paper
        className="userlist-section"
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
    </Box>
  );
};

export default RemovedUser;
