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
import Loader from "../loader";
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

const FormerUsers: React.FC = () => {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState<boolean>(false);
  const [userList, setUserlist] = useState<Array<userInterface>>([]);
  const [data, setData] = useState<Array<userInterface>>([]);
  const fetch = useFetch();
  const getUserList = () => {
    setLoading(true);
    const response = fetch(API.GET_FORMER_USERS_URL, "get", token);
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

  const columns: TableColumn<userInterface>[] = [
    {
      name: <h4>S.No</h4>,
      selector: (row: userInterface) => {
        return data.indexOf(row) + 1;
      },
    },
    {
      name: <h4>Name</h4>,
      selector: (row: userInterface) => row.first_name.toLocaleUpperCase(),
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
      selector: (row: userInterface) => row.role.toLocaleUpperCase(),
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
      <Loader open={loading} />
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
          <Typography sx={{ display: "block", ml: 4, mt: 2, fontSize: 32 }}>
            Former Users
          </Typography>
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

export default FormerUsers;
