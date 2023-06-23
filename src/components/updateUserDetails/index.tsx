import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import validationSchema from "../../schemas/userDetailsSchema";
import TextInput from "../TextInput";
import SelectInput from "../SelectInput";
import DateInput from "../DateInput";
import RadioInput from "../RadioInput";
import * as API from "../../apiURL";
import PopUp from "../popUp";
import useFetch from "../../customHook/useFetch";
import { userFormContext } from "../creatUser";
import Loader from "../loader";
import * as SELECT from "../../selectListCollection";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
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

const UpdateUser = () => {
  const [validUser, setValidUser] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const params = useParams();
  const id = params.id;
  const [open, setOpen] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState(userData);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [result, setResult] = useState("");
  const fetch = useFetch();

  const getUsers = () => {
    setLoading(true);
    const response = fetch(API.GET_PERSONAL_DETAILS_URL + id, "get", token);
    response
      .then((res) => {
        if (!res.data.success) {
          setValidUser(true);
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
      setLoading(true);

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
          setLoading(false);
        });
    },
  });

  return (
    <Box className="container">
      <PopUp
        open={validUser}
        msg="Invalid User"
        handleClose={() => navigate("/dashboard")}
      />
      <Loader open={loading} />
      <PopUp
        msg={"User Updated Successfully"}
        handleClose={() => navigate("/user/" + id)}
        open={open}
        title={<ThumbUpAltIcon color="success" sx={{ fontSize: 45 }} />}
      />
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
          Update User
        </Typography>
        <Typography
          sx={{ fontWeight: "bold", fontSize: 18, mb: 1 }}
          align="left"
          color="error"
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
                    formik.resetForm({
                      values: formik.values,
                    });
                    navigate("/user/" + id);
                  }}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </Grid>{" "}
              <Grid item sm={3} md={3} xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{ marginTop: 1 }}
                  disabled={loading}
                >
                  Update
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
