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
const RecentJoinedUser = ({ userList }: { userList: userInterface[] }) => {
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
