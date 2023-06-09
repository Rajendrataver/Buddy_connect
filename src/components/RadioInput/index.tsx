import {
  FormControlLabel,
  Grid,
  InputLabel,
  Radio,
  RadioGroup,
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
      >
        <InputLabel id="demo-simple-select-label" sx={{ marginTop: 1 }}>
          {formik.touched[name] && formik.errors[name] ? (
            <span className="input-error">{formik.errors[name]}</span>
          ) : (
            label
          )}
        </InputLabel>
        &nbsp;&nbsp; &nbsp;
        <Grid container>
          {items.map((item, i) => {
            return (
              <Grid xs={12} md={4} sm={6}>
                <FormControlLabel
                  value={item}
                  control={<Radio />}
                  label={item}
                  key={i}
                  checked={formik.values[name] === item}
                />
              </Grid>
            );
          })}
        </Grid>
      </RadioGroup>
    </>
  );
};

export default RadioInput;
