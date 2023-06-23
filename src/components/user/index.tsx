import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import * as API from "../../apiURL";
import useFetch from "../../customHook/useFetch";
import PopUp from "../popUp";
import Loader from "../loader";
import Profile from "../profile";
import userDetails, { userData } from "../../InterFaces";
import { Box, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import UserDetails from "../userDetails";
import UserOtherDetails from "../usersOtherDetails";

const User = () => {
  const [validUser, setValidUser] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<userDetails>(userData);
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;
  const token = localStorage.getItem("token");
  const fetch = useFetch();
  const getUserDetails = () => {
    setLoading(true);
    const response = fetch(API.GET_PERSONAL_DETAILS_URL + id, "get", token);
    response
      .then((res) => {
        if (!res.data.success) {
          setValidUser(true);
        } else {
          setUser(res.data.response);
        }
      })
      .catch((err) => {
        console.log(err.data.response.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getUserDetails();
  }, [id]);

  return (
    <Box mt={5} className={"container"}>
      <PopUp
        open={validUser}
        handleClose={() => navigate("/")}
        msg="Invalid User"
      />
      <Loader open={loading} />
      <Grid container alignItems={"center"}>
        <Grid item xs={12} md={4} textAlign={"center"}>
          <Profile imageName={user.image} id={id} />
          <Link to={"/updateuser/" + id}>
            <Button variant="outlined" sx={{ mt: 2 }}>
              Update Details
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} md={8}>
          <UserDetails user={user} />
        </Grid>
      </Grid>
      <UserOtherDetails id={id} />
    </Box>
  );
};

export default User;
