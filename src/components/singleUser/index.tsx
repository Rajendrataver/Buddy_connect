import { AppBar, Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import { useParams } from "react-router";
import useAxios from "../../customHook/useAxios";
import { useEffect, useState } from "react";
const data = {
  first_name: "",
  email: "",
  mobile: "",
  city: "",
  designation: "",
  role: "",
  contact: "",
  gender: "",
};
const SingleUser = () => {
  const params = useParams();
  const id = params.id;
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(data);
  const url =
    "https://buddy-connect.encoreskydev.com/api/user/getPersonalDetail.php?id=" +
    id;
  const axios = useAxios(url, {}, "get", token);
  useEffect(() => {
    if (axios.response) {
      setUser(axios.response.response);
    }
  }, [axios.response]);
  console.log(user);
  var src = "https://www.pngmart.com/files/22/User-Avatar-Profile-PNG.png";
  if (user.gender === "female") {
    src = "https://freesvg.org/img/FaceWoman.png";
  }

  return (
    <>
      <Paper
        sx={{
          maxWidth: 1100,
          margin: "auto",
          width: 100 + "%",
          marginTop: 5,
        }}
      >
        <AppBar position="static" color="default" elevation={0}>
          <Grid container alignItems="center" textAlign={"center"}>
            <Grid item xs={12} md={12}>
              <img src={src} alt={"My Avatar"} loading="lazy" width={400} />
            </Grid>
          </Grid>
          <Typography
            variant="h3"
            component="h2"
            sx={{ margin: 0, marginLeft: 5 }}
          >
            Profile :-
          </Typography>
          <Grid container alignItems="center" padding={4}>
            <Grid item xs={12} md={12}>
              <Typography variant="h4" component="h2">
                Name:{user.first_name} ({user.email})
              </Typography>
              <Typography variant="h6" component="h2">
                Contact: {user.contact}.
              </Typography>
              <Typography variant="h6" component="h2">
                Designation: {user.designation}.
              </Typography>
              <Typography variant="h6" component="h2">
                Role: {user.role}.
              </Typography>
            </Grid>
          </Grid>
          <Grid container padding={4}>
            <Grid item>
              <Button variant="contained" color="primary">
                Add Bank Details
              </Button>
            </Grid>
          </Grid>
        </AppBar>
      </Paper>
    </>
  );
};

export default SingleUser;
