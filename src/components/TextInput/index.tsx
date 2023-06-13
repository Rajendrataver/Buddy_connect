import { useContext } from "react";
import { userFormContext } from "../creatUser";
import { TextField, FormLabel, Box, Typography } from "@mui/material";
const TextInput = ({
  name,
  label,
  type,
  readOnly = false,
}: {
  name: string;
  label: string;
  type: string;
  readOnly?: boolean;
}) => {
  const formik = useContext(userFormContext);
  return (
    <Box sx={{ position: "relative", mb: 3 }}>
      <TextField
        type={type}
        variant="outlined"
        color="primary"
        fullWidth
        sx={{ mb: 0 }}
        label={label}
        name={name}
        disabled={readOnly}
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
    </Box>
  );
};

export default TextInput;
