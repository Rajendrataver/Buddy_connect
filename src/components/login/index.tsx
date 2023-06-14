import "./index.css";
import axios from "axios";
import {
  TextField,
  Box,
  Grid,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
const Login = () => {
  const [onLoad, setOnLoad] = useState<boolean>(false);
  const navigate = useNavigate();
  const [resultMSG, setResultMSG] = useState<string>("result");
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email Is Required")
        .matches(/^[a-zA-Z0-9.]+@+[a-zA-Z0-9]+.+[A-z]/, "Invalid Email"),
      password: Yup.string().required("Password is Required"),
    }),
    onSubmit: (values) => {
      setOnLoad(true);

      axios
        .post("https://buddy-connect.encoreskydev.com/api/login.php", values)
        .then((response) => {
          if (response.data.response.role === "superAdmin") {
            var info = response.data.response;
            localStorage.setItem("token", info.token);
            localStorage.setItem(
              "name",
              info.first_name + " " + info.last_name
            );
            localStorage.setItem("email", info.email);
            localStorage.setItem("role", info.role);
            navigate("/dashboard");
          } else {
            throw new Error("Invalid user");
          }
        })
        .catch((error) => {
          console.log("error:", error);
          setResultMSG("");
          formik.values.email = "";
          formik.values.password = "";
          setTimeout(() => {
            setResultMSG("result");
          }, 4000);
        })
        .finally(() => {
          setOnLoad(false);
        });
    },
  });
  useEffect(() => {
    if (
      localStorage.getItem("role") === "superAdmin" &&
      localStorage.getItem("token")
    ) {
      navigate("/dashboard");
    }
  });

  return (
    <section className="login-section">
      <Paper sx={{ background: "transparent", m: "auto", maxWidth: 450 }}>
        <Box m={5} p={1}>
          <h1>Login</h1>
          <hr />
          <p className={resultMSG}>Invalid user</p>
          <Box>
            <form className="form" onSubmit={formik.handleSubmit}>
              <TextField
                name="email"
                fullWidth
                variant="outlined"
                margin="dense"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label={
                  formik.touched.email && formik.errors.email ? (
                    <span className="input-error">{formik.errors.email}</span>
                  ) : null
                }
              />

              <TextField
                type="password"
                name="password"
                fullWidth
                variant="outlined"
                margin="dense"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                label={
                  formik.touched.password && formik.errors.password ? (
                    <span className="input-error">
                      {formik.errors.password}
                    </span>
                  ) : null
                }
              />
              <Button
                variant="contained"
                type="submit"
                color="primary"
                fullWidth
                disabled={onLoad}
              >
                {onLoad ? <CircularProgress color="inherit" /> : "Login"}
              </Button>
            </form>
          </Box>
        </Box>
      </Paper>
    </section>
  );
};

export default Login;
