import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Theme,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { makeStyles } from "@mui/styles";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import {
  filterPayrolls,
  FilterTableState,
} from "modules/dataTable/redux/dataTableReducer";
import { useState } from "react";
import { useDispatch } from "react-redux";
const moment = require("moment");

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& .MuiFormControl-root": {
      width: "200px",
      margin: "0 10px",
    },
  },
}));

export interface FilterComponentProps {}

export default function FilterComponent(props: FilterComponentProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [filters, setFilters] = useState<FilterTableState>({});
  return (
    <Box className={classes.root}>
      <Box display="flex" alignItems="baseline">
        <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
          <InputLabel>Status</InputLabel>
          <Select
            fullWidth
            value={filters.status || ""}
            onChange={(e) =>
              setFilters({
                ...filters,
                status: e.target.value,
              })
            }
            label="Status"
          >
            <MenuItem value="processing">Processing</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="received">Received</MenuItem>
            <MenuItem value="fulfilled">Fulfilled</MenuItem>
            <MenuItem value="canceled">Canceled</MenuItem>
          </Select>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            inputFormat="yyyy-MM-dd'T'HH:mm:ss'Z'"
            maxDate={new Date(filters.timeTo as string) || undefined}
            value={filters.timeFrom || null}
            onChange={(e) => {
              setFilters({
                ...filters,
                timeFrom: moment(e).format("yyyy-MM-DD[T]HH:mm:ss[Z]"),
              });
            }}
            renderInput={(params) => (
              <TextField
                placeholder="From"
                type="date"
                size="small"
                {...params}
                error={filters.timeFrom === "Invalid date"}
                helperText={
                  filters.timeFrom === "Invalid date" &&
                  "Vui lòng nhập đúng định dạng"
                }
              />
            )}
            label="From"
          />
        </LocalizationProvider>
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          style={{ width: "100px" }}
        >
          <DesktopDatePicker
            inputFormat="yyyy-MM-dd'T'HH:mm:ss'Z'"
            minDate={new Date(filters.timeFrom as string) || undefined}
            label="To"
            value={filters.timeTo || null}
            onChange={(e) => {
              setFilters({
                ...filters,
                timeTo: moment(e).format("yyyy-MM-DD[T]HH:mm:ss[Z]"),
              });
            }}
            renderInput={(params) => (
              <TextField
                type="date"
                size="small"
                {...params}
                error={filters.timeTo === "Invalid date"}
                helperText={
                  filters.timeTo === "Invalid date" &&
                  "Vui lòng nhập đúng định dạng"
                }
              />
            )}
          />
        </LocalizationProvider>
        <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
          <OutlinedInput
            value={filters.search || ""}
            onChange={(e) =>
              setFilters({
                ...filters,
                search: e.target.value,
              })
            }
            placeholder="Invoice#"
          />
        </FormControl>
      </Box>
      <Box>
        <Button
          variant="outlined"
          onClick={() => dispatch(filterPayrolls(filters))}
        >
          Apply
        </Button>
        <Button
          variant="outlined"
          style={{ marginLeft: "10px" }}
          onClick={() => {
            setFilters({});
            dispatch(filterPayrolls({}));
          }}
        >
          Clear
        </Button>
      </Box>
    </Box>
  );
}
