import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import ConfirmBox from "../confirmBox";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
const LogoutButton = ({ fullWidth }: { fullWidth?: boolean }) => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const confirmLogout = () => {
    setOpen(false);
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <ConfirmBox
        msg="Do you want to Log-out ?"
        open={open}
        handleOk={confirmLogout}
        setOpen={setOpen}
      />
      <div
        onClick={() => setOpen(true)}
        style={{
          width: 100 + "%",
          height: 100 + "%",
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
