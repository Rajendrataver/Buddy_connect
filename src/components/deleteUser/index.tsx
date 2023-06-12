
import ConfirmBox from "../confirmBox";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";

const DeleteUser = ({ user_id }: { user_id: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  
  return (
    <>
      
     
    </>
  );
};

export default DeleteUser;
