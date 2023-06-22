import { Typography, Box, Grid, Avatar, Button } from "@mui/material";
import { IMAGE_SRC_URL } from "../../apiURL";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedIcon from "@mui/icons-material/Verified";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import { Link } from "react-router-dom";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import userDetails from "../../InterFaces";

const UserTip = ({ user }: { user: userDetails }) => {
  return (
    <Box
      sx={{
        maxWidth: 250,
        width: 100 + "%",
        pt: 2,
        pb: 1,
        position: "relative",
      }}
    >
      <Grid container>
        <Grid item justifyContent={"center"} sx={{ margin: "auto" }}>
          <Avatar
            src={IMAGE_SRC_URL + user.image}
            sx={{ width: 120, height: 120, objectFit: "cover", m: "auto" }}
            alt={user.first_name.toLocaleUpperCase()}
          />
          <Typography
            gutterBottom
            sx={{
              fontSize: 20,
              color: "white",
              fontWeight: "bold",
              textTransform: "capitalize",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {user.first_name + " " + user.last_name}{" "}
            {user.role === "admin" ? <VerifiedIcon color={"inherit"} /> : null}
          </Typography>
        </Grid>
      </Grid>
      <Grid item p={1} pt={1}>
        <Typography
          display="block"
          variant="caption"
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: 14,
            pb: 1,
          }}
        >
          <PersonIcon /> &nbsp;&nbsp;&nbsp;&nbsp;{user.role}{" "}
        </Typography>
        <hr />
        <Typography
          display="block"
          variant="caption"
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: 14,

            pb: 1,
          }}
        >
          <EmailIcon /> &nbsp;&nbsp;&nbsp;&nbsp;{user.email}
        </Typography>
        <hr />
        <Typography
          display="block"
          variant="caption"
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: 14,
            pb: 1,
          }}
        >
          <PhoneIcon /> &nbsp;&nbsp;&nbsp;&nbsp;{user.contact}
        </Typography>
        <hr />{" "}
      </Grid>
    </Box>
  );
};

export default UserTip;
