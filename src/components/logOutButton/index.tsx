
import ConfirmBox from "../confirmBox";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useContext } from "react";
import { LogInContext } from "../../App";
const LogoutButton = ({ fullWidth }: { fullWidth?: boolean }) => {
  const login = useContext(LogInContext);
  const [open, setOpen] = useState<boolean>(false);
  const confirmLogout = () => {
    setOpen(false);
    localStorage.clear();
    login(false)
  };
  return (
    <>
      <ConfirmBox
        msg="Do you want to Log-out ?"
        open={open}
        handleOk={confirmLogout}
        handleClose={() => setOpen(false)}
      />
      <div
        onClick={() => setOpen(true)}
        style={{
          height: 100 + "%",
          width:100+"%",
          display: "flex",
          alignItems: "center",
        }}
      >
        &nbsp;&nbsp;
        <LogoutIcon /> &nbsp;&nbsp;&nbsp;<span>Log-Out</span>
      </div>
    </>
  );
};

export default LogoutButton;
