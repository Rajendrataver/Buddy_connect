import { AppBar, Box, Grid, Paper, Typography } from "@mui/material";
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
import useFetch from "../../customHook/useFetch";
import SalaryDetails from "../salaryDetails";

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
interface userInterface {
  first_name: string;
  email: string;
  mobile: string;
  city: string;
  designation: string;
  role: string;
  contact: string;
  gender: string;
}
const SingleUser = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const token = localStorage.getItem("token");
  const [user, setUser] = useState<userInterface>(data);
  const fetch = useFetch();
  const getUserDetails = () => {
    const response = fetch(API.GET_PERSONAL_DETAILS_URL + id, "get", token);
    response.then((res) => {
      setUser(res.data.response);
    });
  };

  const axios = useAxios(API.GET_PERSONAL_DETAILS_URL + id, {}, "get", token);

  useEffect(() => {
    getUserDetails();
  }, []);

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
          sx={{ padding: 4, minHeight: 80 + "vh" }}
        >
          <Grid container alignItems={"center"}>
            <Grid item xs={4} md={4} textAlign={"center"}>
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
                sx={{
                  backgroundColor: "whitesmoke",
                  textTransform: "capitalize",
                }}
              >
                {user.first_name}
              </Typography>
            </Grid>
            <Grid item xs={8} md={8}>
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
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography>Salary Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <SalaryDetails id={id} />
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
                  <FamilyDetails id={id} />
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </AppBar>
      </Paper>
    </>
  );
};

export default SingleUser;
