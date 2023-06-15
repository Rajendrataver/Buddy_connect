import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { useContext } from "react";

import { userFormContext } from "../creatUser";

const DateInput = ({ name, label }: { name: string; label: string }) => {
  const formik: any = useContext(userFormContext);
  return (
    <Box sx={{ position: "relative" }}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <FormControl fullWidth sx={{ mb: 1 }}>
        <TextField
          type="date"
          variant="outlined"
          color="primary"
          name={name}
          fullWidth
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched[name] && formik.errors[name] ? true : false}
        />
        <Typography
          sx={{
            margin: 0,
            position: "absolute",
            color: "red",
            bottom: -22,
            left: 5,
          }}
        >
          {formik.touched[name] && formik.errors[name] ? (
            <span className="input-error">{formik.errors[name]}</span>
          ) : null}
        </Typography>
      </FormControl>
    </Box>
  );
};

export default DateInput;
