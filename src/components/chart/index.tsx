import React from "react";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Grid, Paper, Typography } from "@mui/material";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { PieChart } from "react-minimal-pie-chart";

interface dataInterface {
  argument: string;
  value: number;
  color: string;
}

const RoleChart = ({data,title}:{data:dataInterface[],title:string}) => {
 

  return (
    <Paper sx={{ p: 2 }}>
      <Typography
        sx={{ fontWeight: "bold", fontFamily: "sans-serif" }}
        variant="h5"
      >
        {title}
      </Typography>

      <PieChart
        data={data}
        lineWidth={90}
        style={{ height: 400 + "px" }}
        label={({ dataEntry }) => dataEntry.value + " users"}
        labelPosition={80}
        labelStyle={{ fontSize: 4, fontWeight: "bold" }}
        animate={true}
        animationDuration={2000}
        animationEasing={"ease-in-out"}
        radius={45}
        
      />
      <hr />
      <Grid container spacing={2} p={2.5} justifyContent={"center"}>
        {
          data.map((row) => {
            return (
              <Grid item display={"flex"} alignItems={"center"}>
                <FiberManualRecordIcon sx={{ color: row.color }} />
                <Typography fontSize={20} display={"flex"}>
                 {row.argument}
                </Typography>
              </Grid>
            );
          })
        }
      </Grid>
    </Paper>
  );
};
export default RoleChart;
