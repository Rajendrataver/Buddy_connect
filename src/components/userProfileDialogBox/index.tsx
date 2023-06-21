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

const UserProfile = ({
  user,
  onClose,
}: {
  user: userDetails;
  onClose: () => void;
}) => {
  return (
    <Box
      sx={{
        maxWidth: 500,
        width: { md: 500, sm: 500, xs: 100 + "%" },
        pt: 2,
        pb: 1,
        position: "relative",
      }}
    >
      {" "}
      <CloseIcon
        sx={{
          position: "absolute",
          top: 20,
          right: 25,
          fontSize: 25,
          cursor: "pointer",
        }}
        onClick={onClose}
      />
      <Grid container>
        <Grid item textAlign={"center"} sx={{ margin: "auto" }}>
          <Avatar
            src={IMAGE_SRC_URL + user.image}
            sx={{ width: 200, height: 200, objectFit: "cover" }}
            alt={user.first_name.toLocaleUpperCase()}
          />
          <Typography
            gutterBottom
            sx={{
              fontSize: 30,
              color: "darkslategrey",
              fontWeight: "bold",
              textTransform: "capitalize",
              alignItems: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {user.first_name + " " + user.last_name}{" "}
            {user.role === "admin" ? <VerifiedIcon color={"primary"} /> : null}
          </Typography>
        </Grid>
      </Grid>
      <Grid item p={4} pt={1}>
        <Typography
          display="block"
          variant="caption"
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: 20,
            pt: 1,
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
            fontSize: 20,
            pt: 1,
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
            fontSize: 20,
            pt: 1,
            pb: 1,
          }}
        >
          <PhoneIcon /> &nbsp;&nbsp;&nbsp;&nbsp;{user.contact}
        </Typography>
        <hr />{" "}
        <Typography
          display="block"
          variant="caption"
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: 20,
            pt: 1,
            pb: 1,
          }}
        >
          <FmdGoodIcon /> &nbsp;&nbsp;&nbsp;&nbsp;{user.city}{" "}
        </Typography>
        <hr />
        <Grid item textAlign={"right"}>
          <Link to={"/user/" + user.id}>
            <Button variant="contained" sx={{ mt: 2 }}>
              Go To Profile <TrendingFlatIcon />
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;
