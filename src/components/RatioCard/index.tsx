import {
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router";

const RationCard = ({
  percentage,
  title,
  count,
  msg,
}: {
  msg: string;
  percentage: number;

  count: number;
  title: string;
}) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ width: 100 + "%", maxWidth: 500 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="div">
          {msg}
        </Typography>
        <Typography sx={{ mb: 1.5, fontSize: 25 }} color="text.secondary">
          {count}
          <Typography sx={{ color: "black" }}>
            {" " + percentage.toFixed(2) + "%"}
          </Typography>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RationCard;
