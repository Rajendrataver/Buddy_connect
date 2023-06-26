import "./index.css";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { userFormContext } from "../creatUser";
import { useFormik } from "formik";
import TextInput from "../TextInput";
import DateInput from "../DateInput";
import useFetch from "../../customHook/useFetch";
import * as API from "../../apiURL";
import { useState } from "react";
import validationSchema from "./salaryDetailsSchema";
import { salaryData } from "../../InterFaces";
const AddSalaryDetails = ({
  id,
  setOpenAddSalary,
  setAdded,
}: {
  id: string | undefined;
  setOpenAddSalary: (v: boolean) => void;
  setAdded: (v: boolean) => void;
}) => {
  const [result, setResult] = useState<string>("");
  const [onLoad, setOnLoad] = useState<boolean>(false);
  const token = localStorage.getItem("token");
  const fetch = useFetch();
  const formik = useFormik({
    initialValues: salaryData,
    validationSchema,
    onSubmit: (values) => {
      setOnLoad(true);
      const response = fetch(
        API.ADD_SALARY_DETAILS_URL + id,
        "post",
        values
      );
      response
        .then((res) => {
          if (res.data.response) {
            setOpenAddSalary(false);
            setAdded(true);
          }
        })
        .catch((err) => {
          setResult(err.response.data.message);
        })
        .finally(() => {
          setOnLoad(false);
        });
    },
  });

  return (
    <div className="add-salary-section">
      <Paper
        sx={{
          maxWidth: 700,
          padding: 2.5,
          overflow: "auto",
        }}
      >
        <h1>Salary Details</h1>
        <hr />
        <Typography
          sx={{ fontWeight: "bold", fontSize: 18, mb: 1 }}
          align="left"
          color="error"
        >
          {result}
        </Typography>
        <userFormContext.Provider value={formik}>
          <form onSubmit={formik.handleSubmit}>
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
                  <Grid item sm={6} xs={12} md={6}>
                    <TextInput
                      name="conveyance_allowance"
                      type="number"
                      label="Conveyance"
                    />
                  </Grid>
                  <Grid item sm={6} xs={12} md={6}>
                    <TextInput
                      name="utility_allowance"
                      type="number"
                      label="Utility"
                    />
                  </Grid>
                  <Grid item sm={6} xs={12} md={6}>
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
                <Grid container mb={3}>
                  <Grid item sm={5} xs={12}>
                    <DateInput name="appraisal_date" label="" />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={1}
                columnSpacing={1}
                direction={{ xs: "column-reverse", md: "row", sm: "row" }}
                justifyContent={"flex-end"}
              >
                <Grid item xs={12} md={4} sm={4}>
                  <Button
                    disabled={onLoad}
                    variant="contained"
                    color="warning"
                    onClick={() => setOpenAddSalary(false)}
                    fullWidth
                  >
                    Cancel
                  </Button>
                </Grid>{" "}
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
