import { Backdrop, CircularProgress } from "@mui/material";
const Loader = ({ open }: { open: boolean }) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="primary" disableShrink />
    </Backdrop>
  );
};

export default Loader;
