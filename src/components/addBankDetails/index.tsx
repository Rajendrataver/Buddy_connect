import { Button, Grid, Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { userFormContext } from "../creatUser";
import { useFormik } from "formik";
import TextInput from "../TextInput";
import SelectInput from "../SelectInput";
import validationSchema from "./bankDetailsSchema";
import { useState } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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
  console.log(typeof id);

  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
    navigate("/singleuser/" + id);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      setOnLoad(true);
      axios({
        url:
          "https://buddy-connect.encoreskydev.com/api/bank/addBankDetail.php?user_id=" +
          id,
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
          console.log(err);
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
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title"></DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Bank Details Added Successfully
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Ok</Button>
          </DialogActions>
        </Dialog>
      </div>
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
            <Grid container p={1}>
              <Grid item sm={12} xs={12}>
                <h1>Bank Details</h1>
                <hr />
                {result}
                <TextInput
                  name="account_number"
                  type="number"
                  label="Account Number"
                />
                <TextInput name="bank_name" type="text" label="Bank Name" />
                <TextInput name="bank_branch" type="text" label="Branch" />
                <TextInput name="ifsc_code" type="text" label="IFSC Code" />
                <TextInput name="micr_code" type="number" label="MICR Code" />
                <TextInput name="cif_code" type="number" label="CIF Code" />
                <SelectInput
                  name="type_account"
                  label="Account Type"
                  items={accountType}
                />
              </Grid>
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
            </Grid>
          </form>
        </userFormContext.Provider>
      </Paper>
    </>
  );
};

export default AddBankDetails;
