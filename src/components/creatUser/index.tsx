import { Box, Button, Grid, Paper, Typography } from "@mui/material";
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
import * as SELECT from "../../selectListCollection";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import Loader from "../loader";
import { userInitialSate } from "../../InterFaces";
const userFormContext = createContext<any>(0);

const CreateUser = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [onLoad, setOnLoad] = useState(false);
  const navigate = useNavigate();
  const [result, setResult] = useState("");
  const formik = useFormik({
    initialValues: userInitialSate,
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
            formik.errors.email = error.response.data.message;
          } else if (
            error.response.data.message === "This contact is already exist."
          ) {
            formik.errors.contact = error.response.data.message;
          } else if (
            error.response.data.message ===
            "This PAN_CARD number is already exist."
          ) {
            formik.errors.pan_card = error.response.data.message;
          } else {
            setResult(error.response.data.message);
          }
        })
        .finally(() => {
          setOnLoad(false);
        });
    },
  });

  return (
    <Box className="container">
      {open && (
        <PopUp
          msg={"User Registered Successfully"}
          path="/users"
          title={<ThumbUpAltIcon color="success" sx={{ fontSize: 45 }} />}
        />
      )}
      <Loader open={onLoad} />

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
          Register User
        </Typography>
        <Typography
          sx={{ fontSize: 15, fontWeight: "bold", color: "red", mb: 1 }}
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
              <Grid item sm={12} md={12} xs={12}>
                <RadioInput
                  name="gender"
                  label="Gender"
                  items={SELECT.GENDERS}
                />
              </Grid>
            </Grid>

            <Grid container spacing={1}>
              <Grid item sm={12} md={6} xs={12}>
                <SelectInput
                  name="designation"
                  items={SELECT.DESIGNATIONS}
                  label="Designation"
                />
              </Grid>
              <Grid item sm={12} md={6} xs={12}>
                <SelectInput name="role" items={SELECT.ROLES} label="Role" />
              </Grid>
            </Grid>

            <Grid container spacing={1}>
              <Grid item sm={12} md={6} xs={12}>
                <TextInput type="text" label="Pan Card" name="pan_card" />
              </Grid>
              <Grid item sm={12} md={6} xs={12}>
                <SelectInput
                  name="country"
                  label="Country"
                  items={SELECT.COUNTRIES}
                />
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
            <Grid
              container
              columnSpacing={1}
              direction={{ xs: "column-reverse", md: "row", sm: "row" }}
              justifyContent={"flex-end"}
            >
              <Grid item sm={3} md={3} xs={12}>
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
              <Grid item sm={3} md={3} xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{ marginTop: 1 }}
                  disabled={onLoad}
                >
                  Register
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
