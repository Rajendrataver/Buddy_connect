import * as React from "react";
import Box from "@mui/material/Box";
import { Avatar, Button } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useNavigate } from "react-router";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { IMAGE_SRC_URL } from "../../apiURL";
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
const Row = ({ user }: { user: userInterface }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Avatar
            src={IMAGE_SRC_URL + user.image}
            sx={{ width: 55, height: 55 }}
          />
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          sx={{ textTransform: "capitalize" }}
        >
          {user.first_name}
        </TableCell>
        <TableCell align="left">{user.email}</TableCell>
        <TableCell align="left">
          <FiberManualRecordIcon
            color={user.status === "active" ? "success" : "warning"}
          />
        </TableCell>
        <TableCell align="left" sx={{ textTransform: "capitalize" }}>
          {user.role}
        </TableCell>
        <TableCell align="left">
          <Button
            onClick={() => navigate("/singleuser/" + user.id)}
            variant="outlined"
            color="primary"
          >
            Profile
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 2 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Typography variant="h6" gutterBottom component="div">
                Info
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Full Name</TableCell>
                    <TableCell>
                      {user.first_name + " " + user.last_name}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Contact</TableCell>
                    <TableCell>{user.contact}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">Designation</TableCell>
                    <TableCell align="left">{user.designation}</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
export default Row;
