import * as React from "react";
import { Box } from "@mui/material";
import LoginForm from "../components/LoginForm";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../../redux/reducer";
export interface LoginPageProps {}

export default function LoginPage(props: LoginPageProps) {
  const { user } = useSelector((state: RootState) => state.authReducer);
  return (
    <>
      {user?.id ? (
        <Navigate to="/" />
      ) : (
        <Box>
          <LoginForm />
        </Box>
      )}
    </>
  );
}
