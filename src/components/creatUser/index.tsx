import { Box, Button, Paper, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router";
import validationSchema from "./createUserSchema";
import axios from "axios";

const CreateUser = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState("");
  const formik = useFormik({
    initialValues: {
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
    },
    validationSchema,
    onSubmit: (values) => {
      const token = localStorage.getItem("token");
      console.log(values);
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
            navigate("/userlist");
          }
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response.data.message === "This email is already exist.") {
            setResult(formik.values.email + " Already Registered");
            formik.values.email = "";
          }
          if (
            error.response.data.message === "This contact is already exist."
          ) {
            setResult(formik.values.contact + " Already Registered");
            formik.values.contact = "";
          }
          if (
            error.response.data.message ===
            "This PAN_CARD number is already exist."
          ) {
            setResult(formik.values.pan_card + " Already Registered");
            formik.values.pan_card = "";
          }
        });
    },
  });
  return (
    <>
      <Paper
        sx={{
          maxWidth: 65 + "%",
          margin: "auto",
                  marginTop: 5,
          padding:5,
          overflow: "hidden",
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="First Name"
              fullWidth
              required
              placeholder="First Name"
              name="first_name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Last Name"
              placeholder="Last Name"
              name="last_name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
              required
            />
          </Stack>
          <TextField
            type="email"
            variant="outlined"
            color="secondary"
            label="Email"
            placeholder="Email"
            autoComplete="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            required
            sx={{ mb: 4 }}
          />

          <TextField
            type="date"
            variant="outlined"
            color="secondary"
            label="Date of Birth"
            fullWidth
            required
            sx={{ mb: 4 }}
          />
          <Button variant="outlined" color="secondary" type="submit">
            Register
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default CreateUser;
