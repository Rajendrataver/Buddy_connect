import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { createContext, useEffect } from "react";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import validationSchema from "../../schemas/userDetailsSchema";
import axios from "axios";
import TextInput from "../TextInput";
import SelectInput from "../SelectInput";
import DateInput from "../DateInput";
import RadioInput from "../RadioInput";
import * as API from "../../apiURL";
import PopUp from "../popUp";
import useFetch from "../../customHook/useFetch";
import { userFormContext } from "../creatUser";
import Loader from "../loader";

const designation = [
  "Project Manager",
  "Team Lead",
  "Senior Software Engineer",
  "Associate Engineer",
  "Junior Software Engineer",
  "Trainee Engineer",
  "Intern",
];
const userData = {
  first_name: "",
  last_name: "",
  email: "",
  city: "",
  gender: "",
  address: "",
  contact: "",
  dob: "",
  zip_code: "",
  pan_card: "",
  designation: "",
  role: "",
  joining_date: "",
  country: "",
  state: "",
  status: "",
};

const country = [
  "Afghanistan",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard Island and McDonald Islands",
  "Holy See (the)",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Republic of North Macedonia",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];
const roles = ["admin", "hr", "associate"];
const UpdateUser = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams();
  const id = params.id;
  const [open, setOpen] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState(userData);
  const [onLoad, setOnLoad] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [result, setResult] = useState("Update User");
  const fetch = useFetch();

  const getUsers = () => {
    const response = fetch(API.GET_PERSONAL_DETAILS_URL + id, "get", token);
    response
      .then((res) => {
        if (!res.data.success) {
          navigate("/dashboard");
        }
        const data = res.data.response;
        formik.values.first_name = data.first_name;
        formik.values.last_name = data.last_name;
        formik.values.dob = data.dob;
        formik.values.zip_code = data.zip_code;
        formik.values.city = data.city;
        formik.values.joining_date = data.joining_date;
        formik.values.address = data.address;
        formik.values.pan_card = data.pan_card;
        formik.values.country = data.country;
        formik.values.role = data.role;
        formik.values.designation = data.designation;
        formik.values.email = data.email;
        formik.values.contact = data.contact;
        formik.values.email = data.email;
        formik.values.state = data.state;
        formik.values.gender = data.gender;
        formik.values.status = data.status;
        setInitialValues(data);
      })
      .catch(() => {
        console.log("error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: (values) => {
      setOnLoad(true);
      const response = fetch(
        API.UPDATE_USER_DETAILS_URL + id,
        "put",
        token,
        values
      );
      response
        .then((res) => {
          setOpen(true);
        })
        .catch((error) => {
          setResult(error.response.data.message);
        })
        .finally(() => {
          setOnLoad(false);
        });
    },
  });

  return (
    <Box className="container">
      <Loader open={loading} />
      {open && <PopUp msg={"User Updated Successfully"} path={"/user/" + id} />}

      <Paper
        sx={{
          maxWidth: 700,
          margin: "auto",
          marginTop: 5,
          mb: 5,
          padding: 4,
          overflow: "hidden",
        }}
        className="create-user"
      >
        <Typography
          sx={{ fontWeight: "bold", color: "#422626d4", fontSize: 25, mb: 1 }}
          align="left"
        >
          {result}
        </Typography>
        <userFormContext.Provider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6} sm={12}>
                <TextInput name="first_name" type="text" label="First Name" />
              </Grid>
              <Grid item sm={12} md={6} xs={12}>
                <TextInput name="last_name" type="text" label="Last Name" />
              </Grid>
              <Grid item sm={12} md={6} xs={12}>
                <TextInput name="email" type="email" label="Email" />
              </Grid>
              <Grid item sm={12} md={6} xs={12}>
                <TextInput name="contact" type="text" label="Contact" />
              </Grid>

              <Grid item sm={12} md={6} xs={12}>
                <DateInput name="dob" label="Date of Birth" />
              </Grid>
              <Grid item sm={12} md={6} xs={12}>
                <DateInput name="joining_date" label="Joining Date" />
              </Grid>
              <Grid item sm={12} md={6} xs={12}>
                <RadioInput
                  name="gender"
                  label="Gender"
                  items={["male", "female"]}
                />
              </Grid>
            </Grid>

            <Grid container spacing={1}>
              <Grid item sm={12} md={6} xs={12}>
                <SelectInput
                  name="designation"
                  items={designation}
                  label="Designation"
                />
              </Grid>
              <Grid item sm={12} md={6} xs={12}>
                <SelectInput name="role" items={roles} label="Role" />
              </Grid>
            </Grid>

            <Grid container spacing={1}>
              <Grid item sm={12} md={6} xs={12}>
                <TextInput type="text" label="Pan Card" name="pan_card" />
              </Grid>
              <Grid item sm={12} md={6} xs={12}>
                <SelectInput name="country" label="Country" items={country} />
              </Grid>
              <Grid item sm={12} md={6} xs={12}>
                <TextInput type="text" label="State" name="state" />
              </Grid>
              <Grid item sm={12} md={6} xs={12}>
                <TextInput type="text" label="City" name="city" />
              </Grid>
              <Grid item sm={12} md={6} xs={12}>
                <TextInput type="text" label="Address" name="address" />
              </Grid>
              <Grid item sm={12} md={6} xs={12}>
                <TextInput type="number" label="Zip Code" name="zip_code" />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item sm={12} md={4} xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{ marginTop: 1 }}
                  disabled={onLoad}
                >
                  {onLoad ? <CircularProgress color="inherit" /> : "Update"}
                </Button>
              </Grid>
              <Grid item sm={0} md={4} xs={0}></Grid>
              <Grid item sm={12} md={4} xs={12}>
                <Button
                  variant="contained"
                  color="warning"
                  fullWidth
                  sx={{ marginTop: 1 }}
                  onClick={() => {
                    formik.resetForm({
                      values: formik.values,
                    });
                    navigate("/user/" + id);
                  }}
                  disabled={onLoad}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </userFormContext.Provider>
      </Paper>
    </Box>
  );
};
export { userFormContext };
export default UpdateUser;
