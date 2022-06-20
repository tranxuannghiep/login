import * as React from "react";
import { Skeleton } from "@mui/material";

export interface TdTableProps {}

export default function TdTableSkeleton(props: TdTableProps) {
  return (
    <tr>
      <td className="column1">
        <Skeleton variant="text" width="90%" height="40px" />
      </td>
      <td className="column2">
        <Skeleton variant="text" width="90%" height="40px" />
      </td>
      <td className="column4">
        <Skeleton variant="text" width="90%" height="40px" />
      </td>
      <td className="column5">
        <Skeleton variant="text" width="90%" height="40px" />
      </td>
      <td className="column6">
        <div>
          <Skeleton variant="text" width="90%" height="40px" />
        </div>
      </td>
      <td className="column7">
        <Skeleton variant="text" width="90%" height="40px" />
      </td>
      <td className="column8">
        <Skeleton variant="text" width="90%" height="40px" />
      </td>
    </tr>
  );
}
