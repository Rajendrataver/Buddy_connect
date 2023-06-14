import { Box, Grid } from "@mui/material";
import RationCard from "../RatioCard";
import useFetch from "../../customHook/useFetch";
import * as API from "../../apiURL";
import { useEffect, useState } from "react";
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
    <Box className="container" mt={2} mb={5}>
      <Box justifyContent={"space-between"}>
        <Grid container spacing={2} display={"flex"} justifyContent={"center"}>
          <Grid item xs={12} md={4} sm={12}>
            <RationCard
              count={list.length}
              percentage={(list.length * 100) / list.length}
              title={"Hello " + localStorage.getItem("email")}
              key={1}
              msg="Users"
            />
          </Grid>

          <Grid item xs={12} md={4} sm={12}>
            <RationCard
              count={active}
              percentage={(active * 100) / list.length}
              title={"Buddy Connect"}
              key={1}
              msg="Active Users"
            />
          </Grid>
          <Grid item xs={12} md={4} sm={12}>
            <RationCard
              count={list.length - active}
              percentage={((list.length - active) * 100) / list.length}
              title={"Buddy Connect"}
              key={1}
              msg="Deactive Users"
            />
          </Grid>
        </Grid>
        <RecentJoinedUser userList={list} />
      </Box>
    </Box>
  );
};

export default Dashboard;
