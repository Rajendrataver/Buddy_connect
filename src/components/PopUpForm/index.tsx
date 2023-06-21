import { Dialog } from "@mui/material";
const PopUpform = ({
  open,
  element,
  onClose,
}: {
  open: boolean;
  element: any;
  onClose?: (v: boolean) => void;
}) => {
  return (
    <Dialog
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        padding: 1,
        overflow: "auto",
        width:100+"%"
      }}
      open={open}
      onClose={onClose}
    >
      {element}
    </Dialog>
  );
};

export default PopUpform;
