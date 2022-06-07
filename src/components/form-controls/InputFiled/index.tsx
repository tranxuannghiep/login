import { TextField } from "@mui/material";

export interface InputFiledProps {
  label: string;
  name: string;
  form: any;
}

export default function InputFiled(props: InputFiledProps) {
  const { label, name, form } = props;
  return (
    <TextField
      margin="normal"
      fullWidth
      label={label}
      name={name}
      error={form.touched[name] && Boolean(form.errors[name])}
      helperText={form.touched[name] && form.errors[name]}
      value={form.values[name]}
      onChange={form.handleChange}
    />
  );
}
