import {
  Button,
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

import { createContext } from "react";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router";
import validationSchema from "./createUserSchema";
import axios from "axios";
import TextInput from "../TextInput";
import SelectInput from "../SelectInput";
import DateInput from "../DateInput";
import RadioInput from "../RadioInput";
import { log } from "console";
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
  const [result, setResult] = useState("");
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
          console.log("result", result.data);
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
          }
          if (
            error.response.data.message === "This contact is already exist."
          ) {
            setResult(formik.values.contact + " Already Registered");
            formik.values.contact = "";
            formik.errors.contact = error.response.data.message;
          }
          if (
            error.response.data.message ===
            "This PAN_CARD number is already exist."
          ) {
            setResult(formik.values.pan_card + " Already Registered");
            formik.values.pan_card = "";
            formik.errors.pan_card = error.response.data.message;
          }
        })
        .finally(() => {
          setOnLoad(false);
        });
    },
  });
  console.log(formik.values);
  return (
    <>
      {open && (
        <PopUp
          msg={
            formik.values.first_name.toUpperCase() +
            " Has Registered Successfully"
          }
          path="/userlist"
        />
      )}

      <Paper
        sx={{
          maxWidth: 65 + "%",
          margin: "auto",
          marginTop: 5,
          padding: 5,
          overflow: "hidden",
        }}
      >
        <Typography
          sx={{ mx: 2, fontSize: 25 }}
          color="red"
          align="left"
        ></Typography>
        <userFormContext.Provider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container>
              <Grid item sm={4} xs={12} p={1}>
                <h1>Contact Details</h1>
                <hr />
                <TextInput name="first_name" type="text" label="First Name" />
                <TextInput name="last_name" type="text" label="Last Name" />
                <TextInput name="email" type="email" label="Email" />
                <TextInput name="contact" type="text" label="Contact" />
                <RadioInput
                  name="gender"
                  label="Gender"
                  items={["male", "female"]}
                />
                <DateInput name="dob" label="Date of Birth" />
              </Grid>

              <Grid item sm={4} xs={12} p={1}>
                <h1>Job details</h1>
                <hr />
                <SelectInput
                  name="designation"
                  items={designation}
                  label="Designation"
                />
                <SelectInput name="role" items={roles} label="Role" />
                <DateInput name="joining_date" label="Joining Date" />
              </Grid>

              <Grid item sm={4} xs={12} p={1}>
                <h1>Address Details</h1>
                <hr />
                <TextInput type="text" label="Pan Card" name="pan_card" />

                <SelectInput name="country" label="Country" items={country} />

                <TextInput type="text" label="State" name="state" />
                <TextInput type="text" label="City" name="city" />
                <TextInput type="text" label="Address" name="address" />
                <TextInput type="number" label="Zip Code" name="zip_code" />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{ marginTop: 6 }}
                  disabled={onLoad}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </userFormContext.Provider>
      </Paper>
    </>
  );
};
export { userFormContext };
export default CreateUser;
