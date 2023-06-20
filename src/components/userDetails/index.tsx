import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import userDetails from "../../InterFaces";
const UserDetails = ({ user }: { user: userDetails }) => {
  return (
    <TableContainer>
      <Table
        sx={{ maxWidth: 650, width: 100 + "%" }}
        size="small"
        aria-label="a dense table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">{user.first_name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Contact</TableCell>
            <TableCell align="left">{user.contact}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Designation</TableCell>
            <TableCell align="left">{user.designation}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Role</TableCell>
            <TableCell align="left">{user.role}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell align="left">{user.email}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell
              align="left"
              sx={{
                alignItems: "center",
                display: "flex",
                textTransform: "capitalize",
              }}
            >
              {user.status}&nbsp;{" "}
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
};

export default UserDetails;
