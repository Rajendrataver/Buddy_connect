import {
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
  const params = useParams();
  const id = params.id;
  const [open, setOpen] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState(userData);
  const [onLoad, setOnLoad] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [result, setResult] = useState("");
  const fetch = useFetch();

  const getUsers = () => {
    const response = fetch(API.GET_PERSONAL_DETAILS_URL + id, "get", token);
    response.then((res) => {
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
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setOnLoad(false);
        });
    },
  });

  return (
    <>
      {open && (
        <PopUp msg={"Updated SuccessFully"} path={"/singleuser/" + id} />
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
        <Typography sx={{ mx: 2, fontSize: 25 }} color="black" align="left">
          Update User
        </Typography>
        <userFormContext.Provider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container>
              <Grid item sm={12} md={4} xs={12} p={1}>
                <h1>Contact Details</h1>
                <hr />
                <TextInput name="first_name" type="text" label="First Name" />
                <TextInput name="last_name" type="text" label="Last Name" />
                <TextInput
                  name="email"
                  type="email"
                  label="Email"
                  readOnly={true}
                />
                <TextInput name="contact" type="text" label="Contact" />
                <RadioInput
                  name="gender"
                  label="Gender"
                  items={["male", "female"]}
                />
                <DateInput name="dob" label="Date of Birth" />
              </Grid>

              <Grid item sm={12} md={4} xs={12} p={1}>
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

              <Grid item sm={12} md={4} xs={12} p={1}>
                <h1>Address Details</h1>
                <hr />
                <TextInput type="text" label="Pan Card" name="pan_card" />

                <SelectInput name="country" label="Country" items={country} />

                <TextInput type="text" label="State" name="state" />
                <TextInput type="text" label="City" name="city" />
                <TextInput type="text" label="Address" name="address" />
                <TextInput type="number" label="Zip Code" name="zip_code" />
              </Grid>
              <Grid item sm={4} xs={12} textAlign={"center"}>
                <Button
                  disabled={onLoad}
                  variant="contained"
                  color="warning"
                  onClick={() => {
                    navigate("/singleuser/" + id);
                  }}
                  fullWidth
                >
                  "Cancel"
                </Button>
              </Grid>
              <Grid item sm={4}></Grid>
              <Grid item sm={4}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  disabled={onLoad}
                >
                  {onLoad ? <CircularProgress color="inherit" /> : "Update"}
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
export default UpdateUser;
