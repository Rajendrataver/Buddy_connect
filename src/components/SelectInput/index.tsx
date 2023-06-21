import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useContext } from "react";
import { userFormContext } from "../creatUser";

const SelectInput = ({
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
    <FormControl fullWidth sx={{ mb: 3 }}>
      <InputLabel id={name}>
        {formik.touched[name] && formik.errors[name] ? (
          <span className="input-error">{formik.errors[name]}</span>
        ) : (
          label
        )}
      </InputLabel>
      <Select
        name={name}
        labelId={name}
        id={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        fullWidth
        label={
          formik.touched[name] && formik.errors[name] ? (
            <span className="input-error">{formik.errors[name]}</span>
          ) : (
            label
          )
        }
        error={formik.touched[name] && formik.errors[name] ? true : false}
      >
        <MenuItem value="">Select</MenuItem>
        {items.map((item, i) => {
          return (
            <MenuItem key={i} value={item} sx={{ textTransform: "capitalize" }}>
              {item}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default SelectInput;
