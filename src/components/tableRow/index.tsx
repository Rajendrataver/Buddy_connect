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
import { Link } from "react-router-dom";
import PopUpform from "../PopUpForm";
import UserProfile from "../userProfileDialogBox";
import userDetails from "../../InterFaces";
const Row = ({ user, sNo }: { user: userDetails; sNo: number }) => {
  const [open, setOpen] = React.useState<boolean>(false);
 
  return (
    <React.Fragment>
      <PopUpform
        open={open}
        element={<UserProfile user={user} onClose={()=>setOpen(false)}/>}
        onClose={() => setOpen(false)}
      />
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>{sNo}</TableCell>
        <TableCell>
          <Avatar
            src={IMAGE_SRC_URL + user.image}
            sx={{
              width: 55,
              height: 55,
              objectFit: "cover",
              cursor: "pointer",
            }}
            alt={user.first_name.toLocaleUpperCase()}
            onClick={() => setOpen(true)}
            
          />
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          sx={{ textTransform: "capitalize" }}
        >
          {user.first_name}
        </TableCell>
        <TableCell align="left" title={user.email}>
          {user.email}
        </TableCell>
        <TableCell align="left">
          <FiberManualRecordIcon
            color={user.status === "active" ? "success" : "error"}
          />
        </TableCell>
        <TableCell align="left" sx={{ textTransform: "capitalize" }}>
          {user.role}
        </TableCell>
        <TableCell align="left">
          <Link to={"/user/" + user.id}>
            <Button variant="outlined" color="primary">
              Profile
            </Button>
          </Link>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};
export default Row;
