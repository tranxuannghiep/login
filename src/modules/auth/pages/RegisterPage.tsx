import { Box } from "@mui/material";
import * as React from "react";
import RegisterForm from "../components/RegisterForm";

export interface RegisterPageProps {}

export default function RegisterPage(props: RegisterPageProps) {
  return (
    <Box>
      <RegisterForm />
    </Box>
  );
}
