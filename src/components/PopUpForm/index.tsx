import { Backdrop, CircularProgress, Dialog } from "@mui/material";
const PopUpform = ({ open, element }: { open: boolean; element: any }) => {
  return (
    <Dialog
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        padding:1,
        overflow: "auto",
      }}
      open={open}
    >
      {element}
    </Dialog>
  );
};

export default PopUpform;
