import { FormControl, FormHelperText, TextField } from "@mui/material";
import { FormikValues } from "formik";
import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { ILocationParams } from "models/auth";
import { FormattedMessage } from "react-intl";

export interface SelectFiledProps {
  label: string;
  name: string;
  form: FormikValues;
  items: ILocationParams[];
  onChangeId?: Function;
}

export default function AsyncSelectFiled(props: SelectFiledProps) {
  const { label, name, form, items = [], onChangeId } = props;

  return (
    <FormControl
      fullWidth
      margin="normal"
      error={form.touched[name] && Boolean(form.errors[name])}
    >
      <Autocomplete
        options={items}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
            error={form.touched[name] && Boolean(form.errors[name])}
            {...params}
            label={label}
          />
        )}
        disableClearable
        value={
          items.find((val) => val.id === form.values[name]) || {
            id: "",
            name: "",
            pid: null,
          }
        }
        onChange={(_, value) => {
          if (onChangeId) onChangeId(value.id);
          return form.setFieldValue(name, value.id);
        }}
      />

      <FormHelperText>
        {form.touched[name] && form.errors[name] && (
          <FormattedMessage id={form.touched[name] && form.errors[name]} />
        )}
      </FormHelperText>
    </FormControl>
  );
}
