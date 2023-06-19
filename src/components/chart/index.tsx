import React from "react";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Grid, Paper, Typography } from "@mui/material";
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { PieChart } from "react-minimal-pie-chart";

const RoleChart = ({
  hr,
  admin,
  assosiate,
}: {
  hr: number;
  admin: number;
  assosiate: number;
}) => {
  const data = [
    { argument: "HR", value: hr, color: "rgb(220, 57, 18)" },
    { argument: "Admin", value: admin, color: "rgb(51, 102, 204)" },
    { argument: "Assosiate", value: assosiate, color: "rgb(255, 153, 0)" },
  ];

  return (
    <Paper sx={{ p: 2 }}>
      <Typography
        sx={{ fontWeight: "bold", fontFamily: "sans-serif" }}
        variant="h5"
      >
        User According Role
      </Typography>

      <PieChart
        data={data}
        lineWidth={90}
        style={{ height: 400 + "px" }}
        label={({ dataEntry }) => dataEntry.value + ' users'}
        labelPosition={80}
        labelStyle={{ fontSize: 4, fontWeight: "bold" }}
        animate={true}
        animationDuration={2000}
        animationEasing={"ease-in-out"}
        radius={45}
        viewBoxSize={[110, 110]}
      />
      <hr />
      <Grid container spacing={2}  p={2.5} justifyContent={'center'}>
        <Grid item display={"flex"} alignItems={"center"}>
          <FiberManualRecordIcon sx={{ color: data[2].color }} />
          <Typography fontSize={20} display={"flex"}>
            Associate
          </Typography>
        </Grid>
        <Grid item display={"flex"} alignItems={"center"}>
          <FiberManualRecordIcon sx={{ color: data[1].color }} />
          <Typography fontSize={20}>Admin</Typography>
        </Grid>
        <Grid item display={"flex"} alignItems={"center"}>
          <FiberManualRecordIcon sx={{ color: data[0].color }} />
          <Typography fontSize={20}>Hr</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default RoleChart;
