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
import PopUp from "../popUp";

const relations = [
  "father",
  "mother",
  "brother",
  "sister",
  "spouse",
  "son",
  "daughter",
];
const initialValues = {
  name: "",
  contact: "",
  dob: "",
  gender: "",
  relation: "",
  address: "",
};
const AddFamilyDetail = () => {
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
      console.log(values);

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
          console.log(res);
          setOpen(true);
        })
        .catch((err) => {
          console.log(err);

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
      {open && (
        <PopUp
          msg={formik.values.name + " Added as " + formik.values.relation}
          id={id}
        />
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
            <Grid container p={1}>
              <Grid item sm={12} xs={12}>
                <h1>Family Details</h1>
                <hr />
                {result}
                <TextInput name="name" type="text" label="Name" />
                <TextInput name="contact" type="text" label="Contact" />

                <RadioInput
                  name="gender"
                  items={["male", "female"]}
                  label="Gender"
                />
                <SelectInput
                  name="relation"
                  label="Relation"
                  items={relations}
                />
                <DateInput name="dob" label="Date of birth" />
                <TextInput name="address" type="text" label="Address" />
              </Grid>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{ marginTop: 1 }}
                disabled={onLoad}
              >
                Add member
              </Button>
            </Grid>
          </form>
        </userFormContext.Provider>
      </Paper>
    </>
  );
};

export default AddFamilyDetail;
