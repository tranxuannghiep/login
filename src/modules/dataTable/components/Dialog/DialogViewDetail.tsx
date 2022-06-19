import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import {
  PayRolls,
  updatePayroll,
} from "modules/dataTable/redux/dataTableReducer";
import { useState } from "react";
import { STATUS_NAME } from "constants/dataTable.status";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/reducer";
import { LoadingButton } from "@mui/lab";
const moment = require("moment");

export interface DialogViewDetailProps {
  openDialogDetail: boolean;
  setOpenDialogDetail: Function;
  setViewDetail: Function;
  item: PayRolls;
}

export default function DialogViewDetail({
  openDialogDetail,
  setOpenDialogDetail,
  setViewDetail,
  item,
}: DialogViewDetailProps) {
  const { currencies } = useSelector(
    (state: RootState) => state.dataTableReducer
  );
  const dispatch = useDispatch();
  const [payroll, setPayroll] = useState<PayRolls>(item);
  const [loading, setLoading] = useState(false);
  return (
    <Dialog
      open={openDialogDetail}
      disableEscapeKeyDown
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      onClose={(_, reason) => {
        if (reason !== "backdropClick") {
          setOpenDialogDetail(false);
        }
      }}
    >
      <Box padding={1.5}>
        <DialogTitle
          id="alert-dialog-title"
          style={{ display: "flex", alignItems: "center" }}
        >
          <InfoIcon style={{ marginRight: "10px", color: "#3498db" }} />{" "}
          <Typography>Thông tin Item</Typography>
        </DialogTitle>
        <DialogContent>
          <Box>
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormLabel component="legend">Status</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={payroll.received}
                      onChange={() => {
                        setPayroll({
                          ...payroll,
                          received: !payroll.received,
                        });
                      }}
                    />
                  }
                  label={STATUS_NAME.RECEIVED}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={payroll.matched}
                      onChange={() => {
                        setPayroll({
                          ...payroll,
                          matched: !payroll.matched,
                        });
                      }}
                    />
                  }
                  label="Matched"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={payroll.approved}
                      onChange={() => {
                        setPayroll({
                          ...payroll,
                          approved: !payroll.approved,
                        });
                      }}
                    />
                  }
                  label="Approved"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={payroll.fulfilled}
                      onChange={() => {
                        setPayroll({
                          ...payroll,
                          fulfilled: !payroll.fulfilled,
                        });
                      }}
                    />
                  }
                  label={STATUS_NAME.FULFILLED}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={payroll.canceled}
                      onChange={() => {
                        setPayroll({
                          ...payroll,
                          canceled: !payroll.canceled,
                        });
                      }}
                    />
                  }
                  label={STATUS_NAME.CANCELLED}
                />
              </FormGroup>
            </FormControl>
          </Box>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              inputFormat="yyyy-MM-dd'T'HH:mm:ss'Z'"
              value={payroll.date_confirmed}
              onChange={(e) => {
                setPayroll({
                  ...payroll,
                  date_confirmed: moment(e).format("yyyy-MM-DD[T]HH:mm:ss[Z]"),
                });
              }}
              renderInput={(params) => (
                <TextField
                  placeholder="From"
                  type="date"
                  size="small"
                  {...params}
                  error={payroll.date_confirmed === "Invalid date"}
                  helperText={
                    payroll.date_confirmed === "Invalid date" &&
                    "Vui lòng nhập đúng định dạng Ngày tháng"
                  }
                />
              )}
              label="Date"
            />
          </LocalizationProvider>
          <FormControl margin="normal" fullWidth>
            <InputLabel>Currency</InputLabel>
            <Select
              label="Currency"
              size="small"
              value={payroll.currency}
              onChange={(e) =>
                setPayroll({
                  ...payroll,
                  currency: e.target.value,
                })
              }
            >
              {currencies.map((val) => (
                <MenuItem key={val} value={val}>
                  {val}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            type="number"
            fullWidth
            size="small"
            label="Total"
            value={payroll.volume_input_in_input_currency}
            onChange={(e) =>
              setPayroll({
                ...payroll,
                volume_input_in_input_currency: +e.target.value,
              })
            }
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <LoadingButton
            variant="outlined"
            loading={loading}
            onClick={() => {
              if (!(payroll.date_confirmed === "Invalid date"))
                setLoading(true);
              setTimeout(() => {
                dispatch(updatePayroll(payroll));
                setLoading(false);
                setOpenDialogDetail(false);
                setViewDetail("");
              }, 1000);
            }}
          >
            Xác nhận
          </LoadingButton>
          <Button
            disabled={loading}
            variant="contained"
            onClick={() => {
              setOpenDialogDetail(false);
              setViewDetail("");
              setPayroll(item);
            }}
            autoFocus
          >
            Hủy
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
