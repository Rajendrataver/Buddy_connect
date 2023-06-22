import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useContext } from "react";

import { userFormContext } from "../creatUser";

const PasswordInput = ({
  name,
  label,
  className,
}: {
  name: string;
  label: string;
  className?: string;
}) => {
  const [showPassword, setShowpassword] = useState<boolean>(false);
  const formik: any = useContext(userFormContext);
  return (
    <FormControl
      sx={{ border: 0, mt: 1, mb: 1 }}
      variant="outlined"
      fullWidth
      className={className}
    >
      <InputLabel htmlFor="filled-adornment-password">
        {formik.touched[name] && formik.errors[name] ? (
          <span className="input-error">{formik.errors[name]}</span>
        ) : (
          label
        )}
      </InputLabel>
      <OutlinedInput
        id="filled-adornment-password"
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowpassword(!showPassword)}
              onMouseDown={() => setShowpassword(!showPassword)}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={
          formik.touched[name] && formik.errors[name] ? (
            <span className="input-error">{formik.errors[name]}</span>
          ) : (
            label
          )
        }
      />
    </FormControl>
  );
};

export default PasswordInput;
