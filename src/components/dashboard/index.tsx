import { Box, Grid } from "@mui/material";
import RationCard from "../RatioCard";
import useFetch from "../../customHook/useFetch";
import * as API from "../../apiURL";
import { useEffect, useState } from "react";
import RecentJoinedUser from "../recentJoinedUser";
import Loader from "../loader";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import { useNavigate } from "react-router";
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
  image: string;
}
const Dashboard = () => {
  const fetch = useFetch();
  const [list, setList] = useState<Array<userInterface>>([]);
  const [active, setActive] = useState<number>(0);
  const [nonActive, setNonActive] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const getUserList = () => {
    const response = fetch(API.GET_USERS_URL, "get", token);
    response
      .then((res) => {
        setList(res.data.response);
       
      })
      .catch((err) => {
        localStorage.clear();
        navigate("/");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getUserList();
  }, []);
  useEffect(() => {
    const newData = list.filter((row) => {
      return row.status === "active";
    });
    setActive(newData.length);
  }, [list]);

  return (
    <Box className="container" mt={5} mb={5}>
      <Loader open={loading} />
      <Box justifyContent={"space-between"}>
        <Grid container spacing={2} display={"flex"} justifyContent={"center"}>
          <Grid item xs={12} md={4} sm={12}>
            <RationCard
              count={list.length}
              key={1}
              msg={
                <span style={{ display: "flex", alignItems: "center" }}>
                  <SupervisedUserCircleIcon
                    sx={{ fontSize: 50 }}
                    color="primary"
                  />
                  Users
                </span>
              }
            />
          </Grid>

          <Grid item xs={12} md={4} sm={12}>
            <RationCard
              count={active}
              key={1}
              msg={
                <span style={{ display: "flex", alignItems: "center" }}>
                  <BookmarkAddedIcon sx={{ fontSize: 50 }} color="success" />
                  Active Users
                </span>
              }
            />
          </Grid>
          <Grid item xs={12} md={4} sm={12}>
            <RationCard
              count={list.length - active}
              key={1}
              msg={
                <span style={{ display: "flex", alignItems: "center" }}>
                  <BookmarkAddIcon sx={{ fontSize: 50 }} color={"warning"} />
                  Deactive Users
                </span>
              }
            />
          </Grid>
        </Grid>
        <RecentJoinedUser userList={list} />
      </Box>
    </Box>
  );
};

export default Dashboard;
