import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { FormikValues } from "formik";
import { useState } from "react";
import { FormattedMessage } from "react-intl";

export interface PasswordFiledProps {
  label: string;
  name: string;
  form: FormikValues;
}

export default function PasswordFiled(props: PasswordFiledProps) {
  const { label, name, form } = props;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl
      fullWidth
      variant="outlined"
      margin="normal"
      error={form.touched[name] && Boolean(form.errors[name])}
    >
      <InputLabel htmlFor="standard-adornment-password">{label}</InputLabel>
      <OutlinedInput
        id="standard-adornment-password"
        type={showPassword ? "text" : "password"}
        label={label}
        name={name}
        value={form.values[name]}
        onChange={form.handleChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              onMouseDown={(e) => {
                e.preventDefault();
              }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText>
        {form.touched[name] && form.errors[name] && (
          <FormattedMessage id={form.touched[name] && form.errors[name]} />
        )}
      </FormHelperText>
    </FormControl>
  );
}
