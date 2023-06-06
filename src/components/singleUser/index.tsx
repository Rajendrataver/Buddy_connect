import {
  AppBar,
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FamilyDetails from "../FamilyDetails";
import { useNavigate, useParams } from "react-router";
import useAxios from "../../customHook/useAxios";
import { useEffect, useState } from "react";
import * as API from "../../apiURL";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BankDetails from "../bankDetails";

const data = {
  first_name: "",
  email: "",
  mobile: "",
  city: "",
  designation: "",
  role: "",
  contact: "",
  gender: "",
};

const SingleUser = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(data);

  const axios = useAxios(API.GET_PERSONAL_DETAILS_URL + id, {}, "get", token);

  useEffect(() => {
    if (axios.response) {
      setUser(axios.response.response);
    }
  }, [axios.response]);

  var src = "https://www.pngmart.com/files/22/User-Avatar-Profile-PNG.png";
  if (user.gender === "female") {
    src = "https://freesvg.org/img/FaceWoman.png";
  }

  return (
    <>
      <Paper
        sx={{
          maxWidth: 1100,
          margin: "auto",
          width: 100 + "%",
          marginTop: 5,
        }}
      >
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ padding: 4 }}
        >
          <Grid container alignItems="center" textAlign={"center"}>
            <Grid item xs={12} md={12}>
              <img
                src={src}
                alt={"My Avatar"}
                className="avatar-male"
                loading="lazy"
              />
              <Typography
                variant="h4"
                component="h2"
                textAlign="center"
                sx={{ backgroundColor: "whitesmoke" }}
              >
                {user.first_name}
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ marginTop: 5 }}></Box>
          <h4>Personal Details :</h4>
          <Grid container alignItems="center">
            <Grid item xs={12} md={12}>
              <TableContainer>
                <Table
                  sx={{ maxWidth: 650, width: 100 + "%" }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="left">{user.first_name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Contact</TableCell>
                      <TableCell align="left">{user.contact}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Designation</TableCell>
                      <TableCell align="left">{user.designation}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Role</TableCell>
                      <TableCell align="left">{user.role}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Email</TableCell>
                      <TableCell align="left">{user.email}</TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>

          <Grid container sx={{ marginTop: 5 }}>
            <Grid item xs={12} md={12}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Bank Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <BankDetails id={id} />
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>Family Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <h4>Family Details</h4>
                  <Grid container>
                    <Grid item xs={12} md={12}>
                      <FamilyDetails id={id} />
                    </Grid>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate("/add-family-details/" + id)}
                    >
                      Add Memeber
                    </Button>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography>Salary Details</Typography>
                </AccordionSummary>
                <AccordionDetails></AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </AppBar>
      </Paper>
    </>
  );
};

export default SingleUser;
