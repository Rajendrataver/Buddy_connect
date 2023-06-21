import Dialog from "@mui/material/Dialog";
import { Button } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const PopUp = ({
  title = <ErrorOutlineIcon sx={{ fontSize: 45 }} />,
  msg,
  open,
  handleClose,
}: {
  open: boolean;
  title?: any;
  msg: string;
  handleClose?: () => void;
}) => {
  const navigate = useNavigate();
  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        sx={{ width: 100 + "%", margin: "auto" }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ pt: 1, pb: 0 }}>
          {title}
        </DialogTitle>
        <DialogContent sx={{ pt: 0, pb: 0 }}>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ textTransform: "capitalize" }}
          >
            {msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pt: 0, pb: 0 }}>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PopUp;
