import { Box, Card, CardContent, Grid } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import RationCard from "../RatioCard";
import useFetch from "../../customHook/useFetch";
import * as API from "../../apiURL";
import { useEffect, useState } from "react";
import UserList from "../userlist";
import RecentJoinedUser from "../recentJoinedUser";
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

  const token = localStorage.getItem("token");
  const getUserList = () => {
    const response = fetch(API.GET_USERS_URL, "get", token);
    response
      .then((res) => {
        setList(res.data.response);
      })
      .catch((err) => {
        console.log(err);
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
    <>
      <Box sx={{ padding: 5 }} justifyContent={"space-between"}>
        <Grid container spacing={2} display={"flex"} justifyContent={"center"}>
          <Grid item xs={12} md={4} sm={12}>
            <RationCard
              count={list.length}
              percentage={100}
              title={"Hello " + localStorage.getItem("email")}
              path="/userlist"
              key={1}
              msg="Total Listed User"
            />
          </Grid>

          <Grid item xs={12} md={4} sm={12}>
            <RationCard
              count={active}
              percentage={100}
              title={"Active User"}
              path="/userlist"
              key={1}
              msg="Total Active User"
            />
          </Grid>
          <Grid item xs={12} md={4} sm={12}>
            <RationCard
              count={list.length - active}
              percentage={100}
              title={"Active User"}
              path="/userlist"
              key={1}
              msg="Total Deactive User"
            />
          </Grid>
        </Grid>
        <RecentJoinedUser userList={list} />
      </Box>
    </>
  );
};

export default Dashboard;
