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
          console.log(err);
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
        <PopUp
          msg="Salary Details Added Successfully"
          path={"/singleuser/" + id}
        />
      )}
      <Paper
        sx={{
          maxWidth: 700,
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
            <Grid container p={1}>
              <Grid item sm={12} xs={12}>
                <h1>Salary Details</h1>
                <hr />
                <br />
                <h3>Salary</h3>
                <Grid container>
                  <Grid item sm={6} xs={6}>
                    <TextInput
                      name="basic_salary"
                      type="number"
                      label="Basic Salary"
                    />
                  </Grid>
                </Grid>

                <h3>EPF/ESI</h3>
                <Grid container>
                  <Grid item sm={6} xs={6} pr={1}>
                    <TextInput
                      name="pf_amount"
                      type="number"
                      label="Provident Fund"
                    />
                  </Grid>
                  <Grid item sm={6} xs={6} pl={2}>
                    <TextInput
                      name="esic_amount"
                      type="number"
                      label="ESIC Amount"
                    />
                  </Grid>
                </Grid>
                <h3>Taxes</h3>
                <Grid container>
                  <Grid item sm={6} xs={6} pr={1}>
                    <TextInput
                      name="pt_amount"
                      type="text"
                      label="Professional Tax(PT)"
                    />
                  </Grid>
                  <Grid item sm={6} xs={6} pl={2}>
                    <TextInput
                      name="income_tax"
                      type="number"
                      label="Income Tax"
                    />
                  </Grid>
                </Grid>
                <h3>Allowances</h3>
                <Grid container>
                  <Grid item sm={4} xs={4} pr={1}>
                    <TextInput
                      name="conveyance_allowance"
                      type="number"
                      label="Conveyance"
                    />
                  </Grid>
                  <Grid item sm={4} xs={4}>
                    <TextInput
                      name="utility_allowance"
                      type="number"
                      label="Utility"
                    />
                  </Grid>
                  <Grid item sm={4} xs={4} pl={1}>
                    <TextInput
                      name="home_rent_allowances"
                      type="number"
                      label="Home Rent"
                    />
                  </Grid>
                </Grid>
                <h3>Other</h3>
                <Grid container>
                  <Grid item sm={5} xs={5} pr={1}>
                    <TextInput name="laon" type="number" label="Loan" />
                  </Grid>

                  <Grid item sm={4} xs={4} pl={1}>
                    <TextInput
                      name="health_insurance"
                      type="number"
                      label="Health Insurance"
                    />
                  </Grid>
                </Grid>
                <h3>Appraisal Date</h3>
                <Grid container>
                  <Grid item sm={4} xs={4}>
                    <DateInput name="appraisal_date" label="" />
                  </Grid>
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disabled={onLoad}
                sx={{ marginTop: 1 }}
              >
                Add Details
              </Button>
            </Grid>
          </form>
        </userFormContext.Provider>
      </Paper>
    </div>
  );
};

export default AddSalaryDetails;
