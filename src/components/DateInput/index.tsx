import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import { useContext } from "react";

import { userFormContext } from "../creatUser";

const DateInput = ({ name, label }: { name: string; label: string }) => {
  const formik: any = useContext(userFormContext);

  return (
    <>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <FormControl fullWidth sx={{ mb: 1 }}>
        <TextField
          type="date"
          variant="outlined"
          color="primary"
          name={name}
          fullWidth
          sx={{ mb: 1 }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched[name] && formik.errors[name] ? (
          <span className="input-error">{formik.errors[name]}</span>
        ) : null}
      </FormControl>
    </>
  );
};

export default DateInput;
