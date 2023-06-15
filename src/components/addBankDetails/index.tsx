import { Button, Grid, Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { userFormContext } from "../creatUser";
import { useFormik } from "formik";
import TextInput from "../TextInput";
import SelectInput from "../SelectInput";
import validationSchema from "./bankDetailsSchema";
import { useState } from "react";
import axios from "axios";
import PopUp from "../popUp";
import * as API from "../../apiURL";

const accountType = ["primary", "secondary"];
const initialValues = {
  account_number: "",
  bank_name: "",
  bank_branch: "",
  ifsc_code: "",
  micr_code: "",
  cif_code: "",
  type_account: "",
};
const AddBankDetails = () => {
  const navigate = useNavigate();

  const [result, setResult] = useState<string>("");
  const [onLoad, setOnLoad] = useState<boolean>(false);
  const params = useParams();
  const id = params.user_id;
  const token = localStorage.getItem("token");

  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
    navigate("/user/" + id);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      setOnLoad(true);
      axios({
        url: API.ADD_BANK_DETAULS_URL + id,
        data: values,
        method: "post",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          setOpen(true);
        })
        .catch((err) => {
          formik.values.account_number = "";
          setResult("Account Number Already Exist");
          setTimeout(() => {
            setResult(" ");
          }, 3000);
        })
        .finally(() => {
          setOnLoad(false);
        });
    },
  });
  return (
    <>
      {open && (
        <PopUp msg="Bank Details Added Successfully" path={"/user/" + id} />
      )}
      <Paper
        sx={{
          maxWidth: 500,
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
            <h1>Bank Details</h1>
            <hr />
            {result}
            <Grid container p={1} spacing={0.5}>
              <Grid item sm={12} xs={12}>
                <TextInput
                  name="account_number"
                  type="number"
                  label="Account Number"
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <TextInput name="bank_name" type="text" label="Bank Name" />
              </Grid>
              <Grid item sm={12} xs={12}>
                <TextInput name="bank_branch" type="text" label="Branch" />
              </Grid>
              <Grid item sm={12} xs={12}>
                <TextInput name="ifsc_code" type="text" label="IFSC Code" />
              </Grid>
              <Grid item sm={12} xs={12}>
                <TextInput name="micr_code" type="number" label="MICR Code" />
              </Grid>
              <Grid item sm={12} xs={12}>
                <TextInput name="cif_code" type="number" label="CIF Code" />
              </Grid>
              <Grid item sm={12} xs={12}>
                <SelectInput
                  name="type_account"
                  label="Account Type"
                  items={accountType}
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{ marginTop: 1 }}
                  disabled={onLoad}
                >
                  Add
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => navigate("/user/" + id)}
                  fullWidth
                  sx={{ marginTop: 1 }}
                  disabled={onLoad}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </form>
        </userFormContext.Provider>
      </Paper>
    </>
  );
};

export default AddBankDetails;
