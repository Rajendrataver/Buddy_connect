import { Button } from "@mui/material";
import { useNavigate } from "react-router";
import ConfirmBox from "../confirmBox";
import { useState } from "react";

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
      <span onClick={() => setOpen(true)} style={{ width: 100 + "%" }}>
        Log-Out
      </span>
    </>
  );
};

export default LogoutButton;
