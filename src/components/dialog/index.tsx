import Dialog from "@mui/material/Dialog";
import { Button, Zoom } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

const DialogBox = ({
  msg,
  handleClose,
  open,
}: {
  msg: string;
  handleClose: () => void;
  open: boolean;
}) => {
  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        onClose={handleClose}
        sx={{ width: 100 + "%", margin: "auto" }}
      >
        <Zoom in={open} style={{ transitionDelay: open ? "500ms" : "0ms" }}>
          <div>
            <DialogTitle id="alert-dialog-title" sx={{ pt: 1, pb: 0 }}>
              <BookmarkAddedIcon color="success" sx={{ fontSize: 45 }} />
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
          </div>
        </Zoom>
      </Dialog>
    </div>
  );
};

export default DialogBox;
