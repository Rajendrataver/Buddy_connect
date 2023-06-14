import "./index.css";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { useParams } from "react-router";
import { userFormContext } from "../creatUser";
import { useFormik } from "formik";
import TextInput from "../TextInput";
import DateInput from "../DateInput";
import useFetch from "../../customHook/useFetch";
import * as API from "../../apiURL";
import { useState } from "react";
import PopUp from "../popUp";
import validationSchema from "./salaryDetailsSchema";
import { useNavigate } from "react-router";

const initialValues = {
  basic_salary: "",
  pf_amount: "",
  esic_amount: "",
  pt_amount: "",
  income_tax: "",
  appraisal_date: "",
  home_rent_allowances: "",
  conveyance_allowance: "",
  utility_allowance: "",
  loan: "",
  health_insurance: "",
};

const AddSalaryDetails = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [onLoad, setOnLoad] = useState<boolean>(false);
  const params = useParams();
  const id = params.user_id;
  const token = localStorage.getItem("token");
  const fetch = useFetch();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      setOnLoad(true);
      const response = fetch(
        API.ADD_SALARY_DETAILS_URL + id,
        "post",
        token,
        values
      );
      response
        .then((res) => {
          if (res.data.response) {
            setOpen(true);
          }
        })
        .catch((err) => {
          formik.values.appraisal_date = "";
          formik.errors.appraisal_date = "Please Enter A Correct Date";
        })
        .finally(() => {
          setOnLoad(false);
        });
    },
  });

  return (
    <div className="add-salary-section">
      {open && (
        <PopUp msg="Salary Details Added Successfully" path={"/user/" + id} />
      )}
      <Paper
        sx={{
          maxWidth: 700,
          margin: "auto",
          marginTop: 5,
          mb: 5,
          padding: 3,
          overflow: "hidden",
        }}
      >
        <userFormContext.Provider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <h1>Salary Details</h1>
            <hr />

            <Grid container p={1}>
              <Grid item sm={12} xs={12}>
                <h3>Salary</h3>
                <Grid container>
                  <Grid item sm={12} xs={12} md={6}>
                    <TextInput
                      name="basic_salary"
                      type="number"
                      label="Basic Salary"
                    />
                  </Grid>
                </Grid>

                <h3>EPF/ESI</h3>
                <Grid container columnSpacing={1}>
                  <Grid item sm={6} xs={12} md={6}>
                    <TextInput
                      name="pf_amount"
                      type="number"
                      label="Provident Fund"
                    />
                  </Grid>
                  <Grid item sm={6} xs={12} md={6}>
                    <TextInput
                      name="esic_amount"
                      type="number"
                      label="ESIC Amount"
                    />
                  </Grid>
                </Grid>
                <h3>Taxes</h3>
                <Grid container columnSpacing={1}>
                  <Grid item sm={6} xs={12} md={6}>
                    <TextInput
                      name="pt_amount"
                      type="text"
                      label="Professional Tax(PT)"
                    />
                  </Grid>
                  <Grid item sm={6} xs={12} md={6}>
                    <TextInput
                      name="income_tax"
                      type="number"
                      label="Income Tax"
                    />
                  </Grid>
                </Grid>
                <h3>Allowances</h3>
                <Grid container columnSpacing={1}>
                  <Grid item sm={4} xs={12} md={4}>
                    <TextInput
                      name="conveyance_allowance"
                      type="number"
                      label="Conveyance"
                    />
                  </Grid>
                  <Grid item sm={4} xs={12} md={4}>
                    <TextInput
                      name="utility_allowance"
                      type="number"
                      label="Utility"
                    />
                  </Grid>
                  <Grid item sm={4} xs={12} md={4}>
                    <TextInput
                      name="home_rent_allowances"
                      type="number"
                      label="Home Rent"
                    />
                  </Grid>
                </Grid>
                <h3>Other</h3>
                <Grid container columnSpacing={1}>
                  <Grid item sm={6} xs={12} md={6}>
                    <TextInput name="laon" type="number" label="Loan" />
                  </Grid>

                  <Grid item sm={6} xs={12} md={6}>
                    <TextInput
                      name="health_insurance"
                      type="number"
                      label="Health Insurance"
                    />
                  </Grid>
                </Grid>
                <h3>Appraisal Date</h3>
                <Grid container>
                  <Grid item sm={4} xs={12}>
                    <DateInput name="appraisal_date" label="" />
                  </Grid>
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={12} md={4} sm={4}>
                  <Button
                    disabled={onLoad}
                    variant="contained"
                    color="warning"
                    onClick={() => {
                      navigate("/user/" + id);
                    }}
                    fullWidth
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={0} md={4} sm={4}></Grid>
                <Grid item xs={12} md={4} sm={4}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    disabled={onLoad}
                  >
                    Submit Details
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </userFormContext.Provider>
      </Paper>
    </div>
  );
};

export default AddSalaryDetails;
