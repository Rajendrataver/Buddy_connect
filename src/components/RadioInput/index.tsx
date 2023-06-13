import {
  FormControlLabel,
  Grid,
  InputLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { userFormContext } from "../creatUser";

const RadioInput = ({
  name,
  label,
  items,
}: {
  name: string;
  label: string;
  items: string[];
}) => {
  const formik: any = useContext(userFormContext);
  return (
    <>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name={name}
        row
        onChange={formik.handleChange}
        sx={{ position: "relative", mb: 2 }}
      >
        <InputLabel id="demo-simple-select-label" sx={{ marginTop: 1 }}>
          {label}
        </InputLabel>
        &nbsp;&nbsp; &nbsp;
        {items.map((item, i) => {
          return (
            <FormControlLabel
              value={item}
              control={<Radio />}
              label={item}
              key={i}
              checked={formik.values[name] === item}
            />
          );
        })}
        <Typography
          sx={{
            margin: 0,
            position: "absolute",
            color: "red",
            bottom: -12,

            left: 5,
          }}
        >
          {formik.touched[name] && formik.errors[name] ? (
            <span className="input-error">{formik.errors[name]}</span>
          ) : null}
        </Typography>
      </RadioGroup>
    </>
  );
};

export default RadioInput;
