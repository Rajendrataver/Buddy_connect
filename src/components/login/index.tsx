import "./index.css";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import { userFormContext } from "../creatUser";
import PasswordInput from "../passwordInput";
import { LogInContext } from "../../App";
import { TextField, Box, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Loader from "../loader";
import PopUp from "../popUp";
import { useContext } from "react";
import { useNavigate } from "react-router";
const Login = () => {
  const navigate = useNavigate();
  const login: any = useContext(LogInContext);
  const [open, setOpen] = useState<boolean>(false);
  const [onLoad, setOnLoad] = useState<boolean>(false);
  const [resultMSG, setResultMSG] = useState<string>("");
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
            login(true);
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
          setOpen(true);
        })
        .finally(() => {
          setOnLoad(false);
        });
    },
  });

  return (
    <section className="login-section container">
      <PopUp msg={resultMSG} open={open} handleClose={() => setOpen(false)} />
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
          <Typography color={"error"} sx={{ textAlign: "left", mb: 1 }}>
            {resultMSG}
          </Typography>
          <userFormContext.Provider value={formik}>
            <form className="form" onSubmit={formik.handleSubmit}>
              <TextField
                sx={{ border: 0 }}
                className="input-radius"
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
              <PasswordInput
                name="password"
                className="input-radius"
                label="Password"
              />
              <Typography
                sx={{
                  fontFamily: "sans-serif",
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
                  Forget Password?
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
                  fontWeight: 600,
                  minWidth: 84,
                  color: "white",
                }}
              >
                Sign in
              </Button>
            </form>
          </userFormContext.Provider>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Typography
            sx={{
              fontSize: 13,
              fontWeight: 500,
              color: " rgb(140, 163, 186)",
              display: "flex",
              mb: 2,
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
                mb: 2,
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
                mb: 2,
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
