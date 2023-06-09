import { Box, Card, CardContent, Grid } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import RationCard from "../RatioCard";
import useFetch from "../../customHook/useFetch";
import * as API from "../../apiURL";
import { useEffect, useState } from "react";
import UserList from "../userlist";
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

  return (
    <>
      <Box sx={{ padding: 5 }}>
        <Grid container>
          <Grid item xs={4} md={4}>
            <RationCard
              count={list.length}
              percentage={100}
              title="Total user"
              key={1}
              msg="This is user list"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
