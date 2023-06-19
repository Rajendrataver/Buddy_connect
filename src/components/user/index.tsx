import {
  AppBar,
  Avatar,
  Box,
  Button,
  Dialog,
  Grid,
  Paper,
  Switch,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import GppBadIcon from "@mui/icons-material/GppBad";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FamilyDetails from "../FamilyDetails";
import { useNavigate, useParams } from "react-router";

import { useEffect, useState } from "react";
import * as API from "../../apiURL";

import BankDetails from "../bankDetails";
import useFetch from "../../customHook/useFetch";
import SalaryDetails from "../salaryDetails";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import PopUp from "../popUp";
import Loader from "../loader";
import Profile from "../profile";
import ToggelStatus from "../toggelStatus";
const data = {
  first_name: "",
  email: "",
  mobile: "",
  city: "",
  designation: "",
  role: "",
  contact: "",
  gender: "",
  image: "",
  status: "",
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
  image: string | null;
  status: string;
}
const tabs = {
  BANK_DETAILS: "Bank Details",
  SALARY_DETAILS: "Salary Details",
  FAMILY_DETAILS: "Family Details",
};
const User = () => {
  const [validUser, setValidUser] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [onLoad, setOnLoad] = useState<boolean>(false);
  const navigate = useNavigate();
  const [tab, setTab] = useState(tabs.BANK_DETAILS);
  const params = useParams();
  const id = params.id;
  const token = localStorage.getItem("token");
  const [user, setUser] = useState<userInterface>(data);
  const fetch = useFetch();
  const getUserDetails = () => {
    setLoading(true);
    const response = fetch(API.GET_PERSONAL_DETAILS_URL + id, "get", token);
    response
      .then((res) => {
        if (!res.data.success) {
          setValidUser(true);
        } else {
          setUser(res.data.response);
        }
      })
      .catch((err) => {
        console.log(err.data.response.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const changeStatus = () => {
    var status = "";
    setOnLoad(true);
    if (user.status === "active") {
      status = "deActive";
    } else {
      status = "active";
    }
    const response = fetch(API.SET_USER_STATUS_URL + id, "patch", token, {
      status,
    });
    response
      .then((res) => {
        user.status = status;
      })
      .catch((err) => {
        console.log(err.data.response.message);
      })
      .finally(() => {
        setOnLoad(false);
      });
  };
  return (
    <Box>
      {validUser && <PopUp path="/dashboard" msg="Invalid User" />}
      <Loader open={loading} />

      <Paper>
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ minHeight: 100 + "vh", pt: 5 }}
          className="container"
        >
          <Grid container alignItems={"center"}>
            <Grid item xs={12} md={4} textAlign={"center"}>
              <Profile imageName={user.image} id={id} />
              <Button
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={() => {
                  navigate("/updateuser/" + id);
                }}
              >
                Update Details <EditIcon />
              </Button>
            </Grid>
            <Grid item xs={12} md={8}>
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
                    <TableRow>
                      <TableCell>Status</TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          alignItems: "center",
                          display: "flex",
                          textTransform: "capitalize",
                        }}
                      >
                        {user.status}&nbsp;{" "}
                        {user.status === "active" ? (
                          <VerifiedUserIcon color={"primary"} />
                        ) : (
                          <GppBadIcon color={"warning"} />
                        )}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={0} md={1} sm={0}></Grid>
            <Grid item xs={12} md={11} sm={12}>
              <Tabs
                sx={{ maxWidth: 500 + "px" }}
                value={tab}
                indicatorColor="primary"
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab
                  label={tabs.BANK_DETAILS}
                  icon={<AccountBalanceIcon />}
                  value={tabs.BANK_DETAILS}
                  onClick={() => setTab(tabs.BANK_DETAILS)}
                />
                <Tab
                  label={tabs.SALARY_DETAILS}
                  icon={<CurrencyRupeeIcon />}
                  value={tabs.SALARY_DETAILS}
                  onClick={() => setTab(tabs.SALARY_DETAILS)}
                />
                <Tab
                  label={tabs.FAMILY_DETAILS}
                  icon={<FamilyRestroomIcon />}
                  value={tabs.FAMILY_DETAILS}
                  onClick={() => setTab(tabs.FAMILY_DETAILS)}
                />
              </Tabs>
            </Grid>
            <Grid item xs={0} md={1} sm={0}></Grid>
            <Grid item xs={12} md={11} sm={12}>
              {tab === tabs.BANK_DETAILS && <BankDetails id={id} />}
              {tab === tabs.SALARY_DETAILS && <SalaryDetails id={id} />}
              {tab === tabs.FAMILY_DETAILS && <FamilyDetails id={id} />}
            </Grid>
          </Grid>
        </AppBar>
      </Paper>
    </Box>
  );
};

export default User;
