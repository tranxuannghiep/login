import { Box } from "@mui/material";
import { ROUTES } from "configs/routes";
import * as React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "redux/reducer";
import LoginForm from "../components/LoginForm";
export interface LoginPageProps {}

export default function LoginPage(props: LoginPageProps) {
  const { user } = useSelector((state: RootState) => state.authReducer);
  return (
    <>
      {user?.id ? (
        <Navigate to={ROUTES.home} />
      ) : (
        <Box>
          <LoginForm />
        </Box>
      )}
    </>
  );
}
