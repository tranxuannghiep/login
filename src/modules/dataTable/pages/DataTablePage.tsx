import TableComponent from "../components/TableComponent/TableComponent";
import { Box, Container, Pagination, Typography } from "@mui/material";
import FilterComponent from "../components/FilterComponent/FilterComponent";
import { useCallback, useEffect, useState } from "react";
import { getAll, getCurrency, getTotal } from "../api/dataTable";
import { useDispatch, useSelector } from "react-redux";
import { getCurrencies, getPayrolls } from "../redux/dataTableReducer";
import { RootState } from "redux/reducer";

export interface DataTablePageProps {}

export default function DataTablePage(props: DataTablePageProps) {
  const dispatch = useDispatch();
  const { filter } = useSelector((state: RootState) => state.dataTableReducer);
  const [pagination, setPagination] = useState<any>({
    page: 1,
    limit: 10,
    total: 10,
  });
  const [loading, setLoading] = useState(false);
  const getData = useCallback(async () => {
    setLoading(true);
    const [data, total, currencies]: any[] = await Promise.all([
      getAll(pagination.page, pagination.limit, filter),
      getTotal(filter),
      getCurrency(),
    ]);
    dispatch(getPayrolls(data));
    dispatch(getCurrencies(currencies));
    if (Math.ceil(total / pagination.limit) < pagination.page) {
      setPagination((prev: any) => ({
        ...prev,
        total,
        page: 1,
      }));
    } else {
      setPagination((prev: any) => ({
        ...prev,
        total,
      }));
    }
    setLoading(false);
  }, [pagination.page, dispatch, filter, pagination.limit]);
  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <Box>
      <Container
        style={{
          padding: "20px",
          backgroundColor: "#f5f7fb",
          borderRadius: "10px",
          margin: "40px auto",
        }}
      >
        <Typography variant="h5" p={2}>
          Payroll Transactions List
        </Typography>
        <FilterComponent />
        <TableComponent loading={loading} />

        <Box
          padding="32px"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography>
            Showing <strong>{pagination.limit}</strong> from{" "}
            <strong>{pagination.total}</strong> data
          </Typography>
          <Pagination
            count={Math.ceil(pagination.total / pagination.limit)}
            color="primary"
            onChange={(e, page) =>
              setPagination({
                ...pagination,
                page,
              })
            }
            page={pagination.page || 1}
          />
        </Box>
      </Container>
    </Box>
  );
}
