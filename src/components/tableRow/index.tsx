import * as React from "react";
import Tooltip from "@mui/material/Tooltip";
import { Avatar, Button } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { IMAGE_SRC_URL } from "../../apiURL";
import Zoom from "@mui/material/Zoom";
import { Link } from "react-router-dom";
import PopUpform from "../PopUpForm";
import UserProfile from "../userProfileDialogBox";
import userDetails from "../../InterFaces";
import UserTip from "../userTip";
const Row = ({ user, sNo }: { user: userDetails; sNo: number }) => {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <React.Fragment>
      <PopUpform
        open={open}
        element={<UserProfile user={user} onClose={() => setOpen(false)} />}
        onClose={() => setOpen(false)}
      />
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>{sNo}</TableCell>
        <TableCell>
          <Tooltip
            title={<UserTip user={user} />}
            TransitionComponent={Zoom}
            TransitionProps={{ timeout: 400 }}
            arrow
       
          >
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
          </Tooltip>
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
