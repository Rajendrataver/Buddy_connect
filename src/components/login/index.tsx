import "./index.css";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import {
  TextField,
  Box,
  Grid,
  Paper,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Loader from "../loader";
const Login = () => {
  const [onLoad, setOnLoad] = useState<boolean>(false);
  const navigate = useNavigate();
  const [resultMSG, setResultMSG] = useState<string>();
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
            throw new Error("Invalid User");
          }
        })
        .catch((error) => {
          console.log("error:", error.response.data.message);
          if (error.response) {
            setResultMSG(error.response.data.message);
          } else {
            setResultMSG(error.message);
          }
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
      <Loader open={onLoad} />
      <Box
        sx={{
          textAlign: "center",
          maxWidth: 550,
          width: 100 + "%",
          m: "auto",
        }}
      >
        <Box>
          <img src="./logoR.png" alt="" width={60} />
        </Box>
        <Typography
          sx={{
            fontWeight: "bold",
            fontFamily: "sans-serif",
            mt: 2,
            fontSize: 25,
          }}
        >
          Sign in to Buddy
        </Typography>
        <Typography
          sx={{
            fontWeight: "bold",
            fontFamily: "sans-serif",

            color: " rgb(36, 153, 239)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ color: "rgb(140, 163, 186)" }}>
            New Here?
          </Typography>
          &nbsp; Create an Account
        </Typography>

        <Box
          sx={{
            mt: 4,
          }}
        >
          <Typography color={"error"} sx={{textAlign:'left',ml:2,mb:1}}>{resultMSG}</Typography>
          <form className="form" onSubmit={formik.handleSubmit}>
            <TextField
              sx={{ border: 0, m: 1 }}
              className="login-input"
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
                ) : (
                  "Email"
                )
              }
            />
            <TextField
              sx={{ border: 0, m: 1 }}
              className="login-input"
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
                  <span className="input-error">{formik.errors.password}</span>
                ) : (
                  "Password"
                )
              }
            />
            <Typography
              sx={{
                fontFamily: "sans-serif",
                mt: 2,
                mb: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: 12,
              }}
            >
              <Typography sx={{ fontWeight: "400" }}>
                <Checkbox sx={{ borderRadius: 5 }} color="primary" />
                Remember me?
              </Typography>
              <Typography sx={{ color: "rgb(255, 49, 111)" }}>
                Forget Password
              </Typography>
            </Typography>

            <Button
              variant="contained"
              type="submit"
              color="primary"
              fullWidth
              disabled={onLoad}
              sx={{
                height: 50,
                backgroundColor: "rgb(36, 153, 239)",
                m: 1,
                fontWeight: 600,
                minWidth: 84,
                color: "white",
              }}
            >
              Sign in
            </Button>
          </form>
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 500,
              color: " rgb(140, 163, 186)",
              margin: 5,
              display: "flex",
              alignItems: "center",
            }}
          >
            <hr style={{ height: 0 }} />
            &nbsp;OR&nbsp;
            <hr style={{ height: 0 }} />
          </Typography>
          <Box>
            <Button
              variant="outlined"
              fullWidth
              sx={{
                pt: 1.5,
                pb: 1.5,
                mb: 1,
                border: "0.1px solid #8080804f",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img src="./google.png" alt="google" width={19} />
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 500,
                  display: "flex",
                  color: "black",
                  justifyContent: "center",
                  alignItems: "center",
                  textTransform: "capitalize",
                }}
              >
                &nbsp;&nbsp; Signin with Google
              </Typography>
            </Button>

            <Button
              variant="outlined"
              fullWidth
              sx={{
                pt: 1.5,
                pb: 1.5,
                border: "0.1px solid #8080804f",
                mb: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              <img src="./twitter.png" alt="google" width={19} />
              <Typography
                sx={{
                  fontSize: 13,

                  display: "flex",
                  color: "black",
                  justifyContent: "center",
                  alignItems: "center",
                  textTransform: "capitalize",
                }}
              >
                &nbsp;&nbsp; Signin with Twitter
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </section>
  );
};

export default Login;
