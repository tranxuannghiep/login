import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { STATUS_NAME } from "constants/dataTable.status";
import { useDispatch } from "react-redux";
import {
  deletePayroll,
  PayRolls,
} from "modules/dataTable/redux/dataTableReducer";
import { useState } from "react";
import DialogViewDetail from "modules/dataTable/components/Dialog/DialogViewDetail";
export interface TdTableProps {
  payroll: PayRolls;
}
const getStatusName = (
  received: boolean,
  matched: boolean,
  approved: boolean,
  fulfilled: boolean,
  canceled: boolean
) => {
  if (received) return STATUS_NAME.RECEIVED;
  else if (matched || approved) return STATUS_NAME.PROCESSING;
  else if (fulfilled) return STATUS_NAME.FULFILLED;
  else if (canceled) return STATUS_NAME.CANCELLED;
  return STATUS_NAME.PENDING;
};

export default function TdTable({ payroll }: TdTableProps) {
  const dispatch = useDispatch();
  const { received, matched, approved, fulfilled, canceled } = payroll;
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [openDialogDetail, setOpenDialogDetail] = useState(false);
  const [viewDetail, setViewDetail] = useState("");
  const handleDeletePayroll = () => {
    dispatch(deletePayroll(payroll.payroll_id));
  };
  const handleChangeViewDetail = (e: any) => {
    setViewDetail(e.target.value);
    setOpenDialogDetail(true);
  };
  return (
    <>
      <tr>
        <td className="column1">
          {getStatusName(received, matched, approved, fulfilled, canceled)}
        </td>
        <td className="column2">
          {payroll.date_confirmed
            ? new Date(payroll.date_confirmed as string).toLocaleString(
                "en-ZA",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }
              )
            : ""}
        </td>
        {/* <td className="column3">Yopmail</td> 04 Sep 2020*/}
        <td className="column4">{payroll.currency}</td>
        <td className="column5">
          {payroll.volume_input_in_input_currency.toLocaleString("en-US", {
            minimumFractionDigits: 2,
          })}
        </td>
        <td className="column6">
          <div>
            <p>{payroll.subpayroll_ids}</p>
          </div>
        </td>
        <td className="column7">
          <FormControl fullWidth size="small">
            <Select
              fullWidth
              value={viewDetail}
              onChange={handleChangeViewDetail}
              displayEmpty
            >
              <MenuItem value="">View Default</MenuItem>
              <MenuItem value="view-detail">View Detail</MenuItem>
            </Select>
          </FormControl>
        </td>
        <td className="column8">
          <IconButton onClick={() => setOpenDialogDelete(true)}>
            <DeleteIcon style={{ color: "#ff669a" }} />
          </IconButton>
        </td>
      </tr>
      <Dialog
        open={openDialogDelete}
        disableEscapeKeyDown
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClose={(_, reason) => {
          if (reason !== "backdropClick") {
            setOpenDialogDelete(false);
          }
        }}
      >
        <Box padding={1.5}>
          <DialogTitle
            id="alert-dialog-title"
            style={{ display: "flex", alignItems: "center" }}
          >
            <WarningAmberOutlinedIcon
              style={{ marginRight: "10px", color: "#f1c40f" }}
            />{" "}
            <Typography>Xóa Item</Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Bạn có muốn xóa Item đang chọn?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={handleDeletePayroll}>
              Xác nhận
            </Button>
            <Button
              variant="contained"
              onClick={() => setOpenDialogDelete(false)}
              autoFocus
            >
              Hủy
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
      <DialogViewDetail
        openDialogDetail={openDialogDetail}
        setOpenDialogDetail={setOpenDialogDetail}
        setViewDetail={setViewDetail}
        item={payroll}
      />
    </>
  );
}
