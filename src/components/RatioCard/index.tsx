import {
  Card,
  Typography,
  CardContent,
 
} from "@mui/material";
import { ReactHTMLElement } from "react";
import { useNavigate } from "react-router";

const RationCard = ({ count, msg }: { msg: any; count: number }) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ width: 100 + "%" }}>
      <CardContent sx={{display:'flex',justifyContent:'space-between' ,alignItems:'center'}}>
        <Typography variant="h5" component="div">
          {msg}
        </Typography>{" "}
        <Typography
          sx={{ fontSize: 25 }}
          color="text.secondary"
        >
          {count.toString().length===1?'0'+count:count}  
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RationCard;
