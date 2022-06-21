import { Box, CircularProgress } from "@mui/material";
import { ROUTES } from "configs/routes";
import * as React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "redux/reducer";

export interface PrivateRouteProps {
  children: React.ReactElement;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, loading } = useSelector(
    (state: RootState) => state.authReducer
  );

  return loading ? (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  ) : user?.id ? (
    children
  ) : (
    <Navigate to={ROUTES.login} />
  );
}
