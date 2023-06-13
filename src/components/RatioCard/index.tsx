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
  path,
}: {
  msg: string;
  percentage: number;
  path: string;
  count: number;
  title: string;
}) => {
  const navigate = useNavigate();
  return (
    <Card sx={{ width:100+'%',maxWidth:500 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="div">
          {msg}
        </Typography>
        <Typography sx={{ mb: 1.5, fontSize: 25 }} color="text.secondary">
          {count}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate(path)}>
          View List
        </Button>
      </CardActions>
    </Card>
  );
};

export default RationCard;
