import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { FormikValues } from "formik";
import * as React from "react";
import { FormattedMessage } from "react-intl";

export interface SelectFiledProps {
  label: string;
  name: string;
  form: FormikValues;
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 3 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function SelectFiled(props: SelectFiledProps) {
  const { label, name, form } = props;
  return (
    <FormControl
      fullWidth
      margin="normal"
      error={form.touched[name] && Boolean(form.errors[name])}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        fullWidth
        label={label}
        name={name}
        MenuProps={MenuProps}
        value={form.values[name]}
        onChange={form.handleChange}
      >
        <MenuItem value="male">Nam</MenuItem>
        <MenuItem value="female">Nữ</MenuItem>
      </Select>
      <FormHelperText>
        {form.touched[name] && form.errors[name] && (
          <FormattedMessage id={form.touched[name] && form.errors[name]} />
        )}
      </FormHelperText>
    </FormControl>
  );
}
