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

import DialogActions from "@mui/material/DialogActions";
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
  const [onLoad, setOnLoad] = useState<boolean>(false);
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
    response
      .then((res) => {
        if (!res.data.success) {
          navigate("/dashboard");
        } else {
          setUser(res.data.response);
        }
      })
      .catch((err) => {
        console.log(err.data.response.message);
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
    console.log(user);
  }, []);
  var src = "";
  if (user.image) {
    src = API.IMAGE_SRC_URL + user.image;
  } else if (user.gender === "female") {
    src = "https://freesvg.org/img/FaceWoman.png";
  } else {
    src = API.DEFUALT_USER_AVATAR_URL;
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
      <Dialog open={open} fullWidth sx={{ textAlign: "center" }}>
        <DialogTitle id="alert-dialog-title">Upload Profile</DialogTitle>
        <Avatar
          src={imageSrc}
          sx={{ width: 200, height: 200, margin: "auto" }}
        />
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              setImage(null);
            }}
          >
            Cancel
          </Button>
          <Button onClick={() => handleUploadImage()}>Upload</Button>
        </DialogActions>
      </Dialog>
      {openAlert && (
        <PopUp
          msg="Invalid File Type !!!"
          title="Warning"
          path={"/user/" + id}
          setOpenAlert={setOpenAlert}
        />
      )}
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
                      <TableCell align="left">
                        <Switch
                          color="success"
                          checked={user.status === "active" ? true : false}
                          onChange={changeStatus}
                          disabled={onLoad}
                        />
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
    </Box>
  );
};

export default User;
