import {
  AppBar,
  Avatar,
  Box,
  Button,
  Dialog,
  Grid,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
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
}
const tabs = {
  BANK_DETAILS: "Bank Details",
  SALARY_DETAILS: "Salary Details",
  FAMILY_DETAILS: "Family Details",
};
const SingleUser = () => {
  const [image, setImage] = useState<any>();
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string>();
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
      console.log("called", res.data.response);

      setUser(res.data.response);
    });
  };

  const selectedImage = (e: any) => {
    const image = e.target.files[0];
    if (image) {
      const extension = image.name.split(".").pop();
      if (
        extension === "png" ||
        extension === "jpeg" ||
        extension === "gif" ||
        extension === "jpg"
      ) {
        setOpen(true);
        setImage(image);
        setImageSrc(URL.createObjectURL(image));
      } else {
        setOpenAlert(true);
      }
    }
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  var src = "";
  if (user.image) {
    src = `https://buddy-connect.encoreskydev.com/upload/usersImage/${user.image}`;
  } else if (user.gender === "female") {
    src = "https://freesvg.org/img/FaceWoman.png";
  } else {
    src =
      "data:image/jpeg;base64,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";
  }
  const handleTabChange = (v: string) => {
    setTab(v);
  };

  const handleUploadImage = () => {
    const formData = new FormData();
    formData.append("image", image);
    axios({
      url: API.UPLOAD_USER_PROFILE_URL + id,
      method: "post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        getUserDetails();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setOpen(false);
      });
  };
  return (
    <>
      <Dialog open={open} fullWidth sx={{ textAlign: "center" }}>
        <DialogTitle id="alert-dialog-title">Upload Profile</DialogTitle>
        <Avatar
          src={imageSrc}
          sx={{ width: 200, height: 200, margin: "auto" }}
        />
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => handleUploadImage()}>Upload</Button>
        </DialogActions>
      </Dialog>
      {openAlert && (
        <PopUp
          msg="Invalid File Type !!!"
          title="Warning"
          path={"/singleuser/" + id}
          setOpenAlert={setOpenAlert}
        />
      )}
      <Paper>
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ padding: 4, minHeight: 100 + "vh" }}
        >
          <Grid container alignItems={"center"}>
            <Grid item xs={12} md={4} textAlign={"center"}>
              <Box className={"avatar-profile"}>
                <img
                  src={src}
                  alt={"My Avatar"}
                  className="avatar-male"
                  loading="lazy"
                />
                <EditIcon
                  className="edit"
                  sx={{ fontSize: 40, color: " #607d8b" }}
                />
                <input
                  type="file"
                  className="avatar-input"
                  onChange={(e) => {
                    selectedImage(e);
                  }}
                />
              </Box>
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
            <Grid item xs={0} md={1} sm={0}></Grid>
            <Grid item xs={12} md={11} sm={12}>
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
