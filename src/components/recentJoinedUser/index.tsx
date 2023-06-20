import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Row from "../tableRow";
import userDetails from "../../InterFaces";
const RecentJoinedUser = ({ userList }: { userList: userDetails[] }) => {
  return (
    <Box>
      <TableContainer
        sx={{
          padding: 2,
          backgroundColor: "snow",
          margin: "auto",
          width: " -webkit-fill-available",
        }}
      >
        <Typography
          sx={{ fontWeight: "bold", fontFamily: "sans-serif" }}
          variant="h5"
        >
          Recent Joined
        </Typography>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>SNo.</TableCell>
              <TableCell align="left">Profile Image</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Role</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((user, i) => {
              if (i >= 5) {
                return null;
              }
              return <Row user={user} sNo={i + 1} key={i} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RecentJoinedUser;
