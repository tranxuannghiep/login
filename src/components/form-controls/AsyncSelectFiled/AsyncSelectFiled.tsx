import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { FormikValues } from "formik";
import * as React from "react";
import { ILocationParams } from "./../../../models/auth";

export interface SelectFiledProps {
  label: string;
  name: string;
  form: FormikValues;
  items: ILocationParams[];
  onChangeId?: Function;
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
  const { label, name, form, items = [], onChangeId } = props;
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
        onChange={(e) => {
          if (onChangeId) onChangeId(e.target.value);
          form.handleChange(e);
        }}
      >
        {items.map((item: ILocationParams) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{form.touched[name] && form.errors[name]}</FormHelperText>
    </FormControl>
  );
}
