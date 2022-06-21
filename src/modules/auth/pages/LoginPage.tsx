import { Box, CircularProgress } from "@mui/material";
import { ROUTES } from "configs/routes";
import * as React from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducer";
export interface LoginPageProps {}
export default function LoginPage(props: LoginPageProps) {
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
    <Navigate to={ROUTES.home} />
  ) : (
    <Box>
      <LoginForm />
    </Box>
  );
}
