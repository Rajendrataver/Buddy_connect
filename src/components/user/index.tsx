import FamilyDetails from "../FamilyDetails";
import { useParams } from "react-router";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useEffect, useState } from "react";
import * as API from "../../apiURL";
import BankDetails from "../bankDetails";
import useFetch from "../../customHook/useFetch";
import SalaryDetails from "../salaryDetails";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import PopUp from "../popUp";
import Loader from "../loader";
import Profile from "../profile";
import userDetails, { userData } from "../../InterFaces";
import {
  AppBar,
  Box,
  Button,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import UserDetails from "../userDetails";
const tabs = {
  BANK_DETAILS: "Bank Details",
  SALARY_DETAILS: "Salary Details",
  FAMILY_DETAILS: "Family Details",
};
const User = () => {
  const [validUser, setValidUser] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [tab, setTab] = useState(tabs.BANK_DETAILS);
  const params = useParams();
  const id = params.id;
  const token = localStorage.getItem("token");
  const [user, setUser] = useState<userDetails>(userData);
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

  return (
    <Box mt={5}>
      {validUser && <PopUp path="/dashboard" msg="Invalid User" />}
      <Loader open={loading} />
          <Grid container alignItems={"center"}>
            <Grid item xs={12} md={4} textAlign={"center"}>
              <Profile imageName={user.image} id={id} />
              <Link to={"/updateuser/" + id}>
                <Button variant="outlined" sx={{ mt: 2 }}>
                  Update Details
                </Button>
              </Link>
            </Grid>
            <Grid item xs={12} md={8}>
              <UserDetails user={user} />
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
    </Box>
  );
};

export default User;
