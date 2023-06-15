import { Button, Grid, Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { userFormContext } from "../creatUser";
import { useFormik } from "formik";
import TextInput from "../TextInput";
import SelectInput from "../SelectInput";
import { useState } from "react";
import axios from "axios";
import RadioInput from "../RadioInput";
import DateInput from "../DateInput";
import * as API from "../../apiURL";
import validationSchema from "./familyDetailsSchema";
import * as SELECT from "../../selectListCollection";
import Loader from "../loader";

const initialValues = {
  name: "",
  contact: "",
  dob: "",
  gender: "",
  relation: "",
  address: "",
};
const AddFamilyDetail = ({
  id,
  setOpen,
}: {
  id: string | undefined;
  setOpen: (v: boolean) => void;
}) => {
  const [result, setResult] = useState<string>("");
  const [onLoad, setOnLoad] = useState<boolean>(false);

  const token = localStorage.getItem("token");

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      setOnLoad(true);
      axios({
        url: API.ADD_FAMILY_DETAILS_URL + id,
        data: values,
        method: "post",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          setOpen(false);
        })
        .catch((err) => {
          if (err.response.data.message === "This relation is already exist.") {
            formik.errors.relation = err.response.data.message;
            formik.values.relation = "";
          }
          if (err.response.data.message === "This relation is already exist.") {
            formik.errors.relation = err.response.data.message;
          }
        })
        .finally(() => {
          setOnLoad(false);
        });
    },
  });
  return (
    <>
      <Loader open={onLoad} />
      <Paper
        sx={{
          maxWidth: 500,
          margin: "auto",
          padding: 4,
          overflow: "auto",
        }}
      >
        <Typography
          sx={{ mx: 2, fontSize: 25 }}
          color="red"
          align="left"
        ></Typography>
        <userFormContext.Provider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <h1>Family Details</h1>
            {result}
            <hr />
            <Grid container>
              <Grid item sm={12} xs={12}>
                <TextInput name="name" type="text" label="Name" />
              </Grid>
              <Grid item sm={12} xs={12}>
                <TextInput name="contact" type="text" label="Contact" />
              </Grid>
              <Grid item sm={12} xs={12}>
                <RadioInput
                  name="gender"
                  items={SELECT.GENDERS}
                  label="Gender"
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <SelectInput
                  name="relation"
                  label="Relation"
                  items={SELECT.RELATIONS}
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <DateInput name="dob" label="Date of birth" />
              </Grid>
              <Grid item sm={12} xs={12}>
                <TextInput name="address" type="text" label="Address" />
              </Grid>
              <Grid container mt={2}>
                <Grid item xs={12} md={4} sm={4} mt={1}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    disabled={onLoad}
                  >
                    Add member
                  </Button>
                </Grid>
                <Grid item xs={0} md={4} sm={4}></Grid>
                <Grid item xs={12} md={4} sm={4} mt={1}>
                  <Button
                    disabled={onLoad}
                    variant="contained"
                    color="warning"
                    onClick={() => {
                      setOpen(false);
                    }}
                    fullWidth
                  >
                    Cancel
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

export default AddFamilyDetail;
