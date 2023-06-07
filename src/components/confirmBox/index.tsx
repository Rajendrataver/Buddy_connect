import Dialog from "@mui/material/Dialog";
import { Button } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
interface confirmInterface {
  msg: string;
  open: boolean;
  handleOk: (member?: any) => void;
  setOpen: (v: boolean) => void;
}
const ConfirmBox = ({ msg, open, handleOk, setOpen }: confirmInterface) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        sx={{ width: 20 + "%", margin: "auto" }}
      >
        <DialogTitle id="alert-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => handleOk()}>Ok</Button>{" "}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmBox;
