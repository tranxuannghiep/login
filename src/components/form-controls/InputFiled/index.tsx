import { FormControl, FormHelperText, TextField } from "@mui/material";
import { FormikValues } from "formik";
import { FormattedMessage } from "react-intl";

export interface InputFiledProps {
  label: string;
  name: string;
  form: FormikValues;
}

export default function InputFiled(props: InputFiledProps) {
  const { label, name, form } = props;
  return (
    <FormControl
      margin="normal"
      fullWidth
      error={form.touched[name] && Boolean(form.errors[name])}
    >
      <TextField
        error={form.touched[name] && Boolean(form.errors[name])}
        label={label}
        name={name}
        // helperText={form.touched[name] && form.errors[name]}
        value={form.values[name]}
        onChange={form.handleChange}
      />

      <FormHelperText>
        {form.touched[name] && form.errors[name] && (
          <FormattedMessage id={form.touched[name] && form.errors[name]} />
        )}
      </FormHelperText>
    </FormControl>
  );
}
