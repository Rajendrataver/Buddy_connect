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
import RoleChart from "../chart";
import userDetails from "../../InterFaces";
const Dashboard = () => {
  const fetch = useFetch();
  const [list, setList] = useState<Array<userDetails>>([]);

  const [active, setActive] = useState<number>(0);
  const [hr, setHR] = useState<number>(0);
  const [admin, setAdmin] = useState<number>(0);
  const [assosiate, setAssosiate] = useState<number>(0);
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
    var newData = list.filter((row) => {
      return row.status === "active";
    });
    setActive(newData.length);
    newData = list.filter((row) => {
      return row.role === "hr";
    });
    setHR(newData.length);
    newData = list.filter((row) => {
      return row.role === "associate";
    });
    setAssosiate(newData.length);
    newData = list.filter((row) => {
      return row.role === "admin";
    });
    setAdmin(newData.length);
  }, [list]);
  const data = [
    { argument: "HR", value: hr, color: "rgb(220, 57, 18)" },
    { argument: "Admin", value: admin, color: "rgb(51, 102, 204)" },
    { argument: "Assosiate", value: assosiate, color: "rgb(255, 153, 0)" },
  ];
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
        <Grid container mt={3} spacing={2}>
          <Grid item md={8} sm={12} xs={12}>
            <RecentJoinedUser userList={list} />
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <RoleChart data={data} title="Users According Role" />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
