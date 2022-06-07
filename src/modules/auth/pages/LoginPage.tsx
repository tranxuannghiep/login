import * as React from "react";
import { Box } from "@mui/material";
import LoginForm from "../components/LoginForm";

export interface LoginPageProps {}

export default function LoginPage(props: LoginPageProps) {
  return (
    <Box>
      <LoginForm />
    </Box>
  );
}
