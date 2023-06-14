import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import "./index.css";
import { createContext } from "react";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router";
import validationSchema from "../../schemas/userDetailsSchema";
import axios from "axios";
import TextInput from "../TextInput";
import SelectInput from "../SelectInput";
import DateInput from "../DateInput";
import RadioInput from "../RadioInput";
import PopUp from "../popUp";
const designation = [
  "Project Manager",
  "Team Lead",
  "Senior Software Engineer",
  "Associate Engineer",
  "Junior Software Engineer",
  "Trainee Engineer",
  "Intern",
];
export const initialValues = {
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
};

const userFormContext = createContext<any>(0);
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
const CreateUser = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [onLoad, setOnLoad] = useState(false);
  const navigate = useNavigate();
  const [result, setResult] = useState("Register User");
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      setOnLoad(true);
      const token = localStorage.getItem("token");

      axios({
        url: "https://buddy-connect.encoreskydev.com/api/register.php",
        method: "post",
        data: values,
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((result) => {
          if (result.data.success) {
            setOpen(true);
          }
        })
        .catch((error) => {
          console.log(error);

          if (error.response.data.message === "This email is already exist.") {
            setResult(formik.values.email + " Already Registered");
            formik.values.email = "";
            formik.errors.email = error.response.data.message;
          } else if (
            error.response.data.message === "This contact is already exist."
          ) {
            setResult(formik.values.contact + " Already Registered");
            formik.values.contact = "";
            formik.errors.contact = error.response.data.message;
          } else if (
            error.response.data.message ===
            "This PAN_CARD number is already exist."
          ) {
            setResult(formik.values.pan_card + " Already Registered");
            formik.values.pan_card = "";
            formik.errors.pan_card = error.response.data.message;
          } else {
            setResult(error.response.data.message);
          }
        })
        .finally(() => {
          setOnLoad(false);
          setTimeout(() => {
            setResult("Register User");
          }, 3000);
        });
    },
  });

  return (
    <Box className="container">
      {open && <PopUp msg={"User Registered Successfully"} path="/users" />}

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
          sx={{ fontSize: 25, fontWeight: "bold", color: "#422626d4", mb: 1 }}
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
                  {onLoad ? <CircularProgress color="inherit" /> : "Register"}
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
                    navigate("/dashboard/");
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
export default CreateUser;
