import { useContext } from "react";
import { userFormContext } from "../creatUser";
import { TextField } from "@mui/material";
const TextInput = ({
  name,
  label,
  type,
}: {
  name: string;
  label: string;
  type: string;
}) => {
  const formik = useContext(userFormContext);
  const value = formik.values["first_name"];
  return (
    <TextField
      type={type}
      variant="outlined"
      color="primary"
      fullWidth
      sx={{ mb: 1 }}
      placeholder={label}
      name={name}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      label={
        formik.touched[name] && formik.errors[name] ? (
          <span className="input-error">{formik.errors[name]}</span>
        ) : (
          label
        )
      }
    />
  );
};

export default TextInput;
