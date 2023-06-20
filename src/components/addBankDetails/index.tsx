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
import { ADD_BANK_DETAULS_URL } from "../../apiURL";
import * as SELECT from "../../selectListCollection";
import Loader from "../loader";
import { bankData } from "../../InterFaces";


const AddBankDetails = ({
  id,
  setOpenBank,
  setAdded,
}: {
  id: string | undefined;
  setOpenBank: (v: boolean) => void;
  setAdded: (v: boolean) => void;
}) => {
  const [result, setResult] = useState<string>("");
  const [onLoad, setOnLoad] = useState<boolean>(false);
  const token = localStorage.getItem("token");
  const formik = useFormik({
    initialValues: bankData,
    validationSchema,
    onSubmit: (values) => {
      setOnLoad(true);
      axios({
        url: ADD_BANK_DETAULS_URL + id,
        data: values,
        method: "post",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          setOpenBank(false);
          setAdded(true);
        })
        .catch((err) => {
          console.log(err);
          setResult(err.response.data.message);
        })
        .finally(() => {
          setOnLoad(false);
        });
    },
  });
  return (
    <>
      <Paper
        sx={{
          maxWidth: 500,
          margin: "auto",
          padding: 4,
          overflow: "auto",
        }}
      >
        <Loader open={onLoad} />

        <Typography sx={{ mx: 2, fontSize: 25 }} color="red" align="left">
          {result}
        </Typography>
        <userFormContext.Provider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <h1>Bank Details</h1>
            <hr />

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
                  items={SELECT.ACCOUNT_TYPE}
                />
              </Grid>
              <Grid
                container
                spacing={1}
                columnSpacing={1}
                direction={{ xs: "column-reverse", md: "row", sm: "row" }}
                justifyContent={"flex-end"}
              >
                <Grid item sm={4} xs={12} md={4}>
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={() => setOpenBank(false)}
                    fullWidth
                    sx={{ marginTop: 1 }}
                    disabled={onLoad}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item sm={4} xs={12} md={4}>
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
              </Grid>
            </Grid>
          </form>
        </userFormContext.Provider>
      </Paper>
    </>
  );
};

export default AddBankDetails;
