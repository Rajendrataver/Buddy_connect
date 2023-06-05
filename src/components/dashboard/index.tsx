import { AppBar, Box, Paper, Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <>
      {" "}
      <Box
        sx={{
          maxWidth: 1100,
          margin: "auto",
          width: 100 + "%",
          marginTop: 5,
        }}
      >
        <Typography variant="h4">
          Welcome: {localStorage.getItem("email")}
        </Typography>
      </Box>
    </>
  );
};

export default Dashboard;
