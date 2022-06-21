import TableComponent from "../components/TableComponent/TableComponent";
import { Box, Container, Pagination, Typography } from "@mui/material";
import FilterComponent from "../components/FilterComponent/FilterComponent";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getAll, getCurrency } from "../api/dataTable";
import { useDispatch } from "react-redux";
import { getCurrencies, getPayrolls } from "../redux/dataTableReducer";
import queryString from "query-string";
import { useQuery } from "hooks/useQuery";
import { useLocation } from "react-router-dom";

export interface DataTablePageProps {}

export default function DataTablePage(props: DataTablePageProps) {
  const dispatch = useDispatch();
  const [, setQuery] = useQuery();
  const location = useLocation();

  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);

    return {
      ...params,
      page: Number(params.page) || 1,
      limit: Number(params.limit) || 10,
    };
  }, [location.search]);
  const handleFiltersChange = (newFilters: any) => {
    setQuery(newFilters);
  };
  const [pagination, setPagination] = useState<any>({
    page: 1,
    limit: 10,
    total: 10,
  });
  const [loading, setLoading] = useState(false);
  const getData = useCallback(async () => {
    setLoading(true);
    const [{ data, pagination }, currencies]: any[] = await Promise.all([
      getAll(queryParams as any),
      getCurrency(),
    ]);
    dispatch(getPayrolls(data));
    dispatch(getCurrencies(currencies));
    setPagination(pagination);
    setLoading(false);
  }, [dispatch, queryParams]);
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
        <FilterComponent query={queryParams} onChange={handleFiltersChange} />
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
              setQuery({
                ...queryParams,
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
