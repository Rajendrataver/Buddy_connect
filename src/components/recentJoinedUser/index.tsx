import {
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
    <>
      <Typography
        sx={{ mt: 5, fontWeight: "bold", fontFamily: "sans-serif" }}
        variant="h5"
      >
        Recent Joined
      </Typography>
      <TableContainer
        sx={{ padding: 2, backgroundColor: "snow", maxWidth: 1000 }}
      >
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="left">Profile</TableCell>
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
              return <Row user={user} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default RecentJoinedUser;
