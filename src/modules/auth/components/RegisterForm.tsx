import { Box, Button, Theme } from "@mui/material";
import InputFiled from "../../../components/form-controls/InputFiled";
import { LoadingButton } from "@mui/lab";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import PasswordFiled from "../../../components/form-controls/PasswordFiled";
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    maxWidth: "600px",
    margin: "0 auto",
  },
  register: {
    padding: "20px",
    "&  .MuiFormHelperText-root": {
      fontSize: "16px",
    },
  },
}));
export interface RegisterFormProps {}

export default function RegisterForm(props: RegisterFormProps) {
  const classes = useStyles();
  const navigate = useNavigate();
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(4, "Password should be of minimum 4 characters length")
      .required("Password is required"),
    repeatPassword: yup
      .string()
      .required("RepeatPassword is required")
      .oneOf([yup.ref("password")], "Password does not match"),
    name: yup
      .string()
      .required("Name is required")
      .test(
        "should has at least two words",
        "Please enter at least two words",
        (value = "") => {
          return value.split(" ").length >= 2;
        }
      ),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
      name: "",
    },
    validationSchema: validationSchema,
    onSubmit: (formValues) => {
      console.log(formValues);
    },
  });
  return (
    <Box className={classes.root}>
      <form onSubmit={formik.handleSubmit}>
        <Box className={classes.register}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Tcj3W5LZYlioIj5o9yXL0fHeYrcBstH98OOPxWqnsmdzUZgLNVkrAKdP92zLEftSXoU&usqp=CAU"
            alt=""
            style={{
              maxWidth: "250px",
              margin: "0 auto",
              textAlign: "center",
              display: "block",
            }}
          />
          {/* {!!errorMessages && (
            <Typography color="red">{errorMessages}</Typography>
          )} */}

          <InputFiled label="Địa chỉ Email" name="email" form={formik} />
          <PasswordFiled label="Mật khẩu" name="password" form={formik} />
          <PasswordFiled
            label="Xác nhận lại mật khẩu"
            name="repeatPassword"
            form={formik}
          />
          <InputFiled label="Họ và tên" name="name" form={formik} />

          <Box textAlign="center">
            <LoadingButton type="submit" variant="contained">
              Đăng ký
            </LoadingButton>
          </Box>
          <Box textAlign="center" mt={2}>
            <Button onClick={() => navigate("/login")}>
              Bạn đã có tài khoản. Đăng nhập ngay !
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
