import Dialog from "@mui/material/Dialog";
import { Button } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router";
const PopUp = ({
  title = "Notification",
  msg,
  path,
  setOpenAlert,
}: {
  title?: string;
  msg: string;
  path?: string;
  setOpenAlert?: (v: boolean) => void;
}) => {
  const navigate = useNavigate();
  const handleClose = () => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <div>
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        sx={{ width: 100 + "%", margin: "auto" }}
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ textTransform: "capitalize" }}
          >
            {msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              if (setOpenAlert) {
                setOpenAlert(false);
              } else {
                handleClose();
              }
            }}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PopUp;
