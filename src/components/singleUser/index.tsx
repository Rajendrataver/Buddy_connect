import {
  AppBar,
  Box,
  Button,
  Dialog,
  Grid,
  Paper,
  Tab,
  Tabs,
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
import MdPhone from "@mui/icons-material/Phone";
import BankDetails from "../bankDetails";
import useFetch from "../../customHook/useFetch";
import SalaryDetails from "../salaryDetails";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import EditIcon from "@mui/icons-material/Edit";
import UpdateUser from "../updateUserDetails";
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
const tabs = {
  BANK_DETAILS: "Bank Details",
  SALARY_DETAILS: "Salary Details",
  FAMILY_DETAILS: "Family Details",
};
const SingleUser = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(tabs.BANK_DETAILS);
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
  const handleTabChange = (v: string) => {
    setTab(v);
    console.log(v);
  };
  return (
    <>
      
      <Paper>
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ padding: 4, minHeight: 100 + "vh" }}
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
                <Button
                  onClick={() => {
                    navigate("/updateuser/" + id);
                  }}
                >
                  <EditIcon />
                </Button>
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

          <Grid container>
            <Grid item xs={12} md={12}>
              <Tabs
                sx={{ maxWidth: 500 + "px" }}
                value={tab}
                indicatorColor="secondary"
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab
                  label={tabs.BANK_DETAILS}
                  icon={<AccountBalanceIcon />}
                  value={tabs.BANK_DETAILS}
                  onClick={() => handleTabChange(tabs.BANK_DETAILS)}
                />
                <Tab
                  label={tabs.SALARY_DETAILS}
                  icon={<CurrencyRupeeIcon />}
                  value={tabs.SALARY_DETAILS}
                  onClick={() => handleTabChange(tabs.SALARY_DETAILS)}
                />
                <Tab
                  label={tabs.FAMILY_DETAILS}
                  icon={<FamilyRestroomIcon />}
                  value={tabs.FAMILY_DETAILS}
                  onClick={() => handleTabChange(tabs.FAMILY_DETAILS)}
                />
              </Tabs>
            </Grid>
            <Grid item xs={12} md={12}>
              {tab === tabs.BANK_DETAILS && <BankDetails id={id} />}
              {tab === tabs.SALARY_DETAILS && <SalaryDetails id={id} />}
              {tab === tabs.FAMILY_DETAILS && <FamilyDetails id={id} />}
            </Grid>
          </Grid>
        </AppBar>
      </Paper>
    </>
  );
};

export default SingleUser;
