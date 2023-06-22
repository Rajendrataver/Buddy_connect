import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Table, { TableColumn } from "react-data-table-component";
import { useState } from "react";
import useFetch from "../../customHook/useFetch";
import * as API from "../../apiURL";
import { Avatar, Box } from "@mui/material";
import Loader from "../loader";
import userDetails from "../../InterFaces";
const FormerUsers: React.FC = () => {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState<boolean>(false);
  const [userList, setUserlist] = useState<Array<userDetails>>([]);
  const [data, setData] = useState<Array<userDetails>>([]);
  const fetch = useFetch();
  const getUserList = () => {
    setLoading(true);
    const response = fetch(API.GET_FORMER_USERS_URL, "get", token);
    response.then((res) => {
      const data = res.data.response.reverse();
      setUserlist(data);
      setData(data);
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
      name: <h4>S.No</h4>,
      selector: (row: userDetails) => {
        return data.indexOf(row) + 1;
      },
    },
    {
      name: <h4>Profile</h4>,
      cell: (row: userDetails) => {
        return (
          <Avatar
            src={API.IMAGE_SRC_URL + row.image}
            sx={{ width: 55, height: 55, objectFit: "cover" }}
            alt={row.first_name.toLocaleUpperCase()}
          />
        );
      },
      style: { padding: 5 + "px" },
    },
    {
      name: <h4>Name</h4>,
      selector: (row: userDetails) => row.first_name,
      sortable: true,
      style: {
        textTransform: "capitalize",
      },
    },
    {
      name: <h4>Email</h4>,
      selector: (row: userDetails) => row.email,
      sortable: true,
    },

    {
      name: <h4>Designation</h4>,
      selector: (row: userDetails) => row.designation,
      sortable: true,
    },
    {
      name: <h4>Role</h4>,
      selector: (row: userDetails) => row.role,
      sortable: true,
      style: {
        textTransform: "capitalize",
      },
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
          <Typography
            sx={{
              fontWeight: "bold",
              fontFamily: "sans-serif",
              mt: 2,
              ml: 4,
              fontSize: 30,
            }}
          >
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
            style={{ padding: 1 }}
          />
        </Typography>
      </Paper>
    </Box>
  );
};

export default FormerUsers;
