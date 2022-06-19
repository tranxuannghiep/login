import * as React from "react";
import "./TableComponent.scss";
import { Box } from "@mui/material";
import TdTable from "modules/common/components/TdTable";
import TdTableSkeleton from "modules/common/components/TdTableSkeleton";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducer";

export interface TableComponentProps {
  loading: boolean;
}

export default function TableComponent({ loading }: TableComponentProps) {
  const { payrolls } = useSelector(
    (state: RootState) => state.dataTableReducer
  );
  return (
    <Box id="TableComponent">
      <table>
        <thead>
          <tr className="table100-head">
            <th className="column1">Status</th>
            <th className="column2">Date</th>
            {/* <th className="column3">Client</th> */}
            <th className="column4">Currency</th>
            <th className="column5">Total</th>
            <th className="column6">Invoice#</th>
            <th className="column7"></th>
            <th className="column8"></th>
          </tr>
        </thead>
        <tbody>
          {!loading
            ? payrolls.map((payroll: any) => (
                <TdTable key={payroll.payroll_id} payroll={payroll} />
              ))
            : Array(10)
                .fill(0)
                .map((_, index) => <TdTableSkeleton key={index} />)}
        </tbody>
      </table>
    </Box>
  );
}
