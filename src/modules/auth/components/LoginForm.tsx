import {
  Box,
  Checkbox,
  FormControlLabel,
  Theme,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchThunk } from "./../../common/redux/thunk";
import { API_PATHS } from "./../../../configs/api";
import { RESPONSE_STATUS_SUCCESS } from "../../../utils/httpResponseCode";
import { setUserInfo } from "../redux/authReducer";
import { getErrorMessageResponse } from "../../../utils";
import { Navigate, useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/reducer";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import * as yup from "yup";
import { useFormik } from "formik";
import InputFiled from "../../../components/form-controls/InputFiled";
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
  login: {
    // border: "1px solid #ddd",
    padding: "20px",
    "&  .MuiFormHelperText-root": {
      fontSize: "16px",
    },
  },
}));
export interface LoginFormProps {}

export default function LoginForm(props: LoginFormProps) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.authReducer);
  const dispatch =
    useDispatch<ThunkDispatch<RootState, null, Action<string>>>();
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState("");
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(4, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (formValues) => {
      setLoading(true);
      const res = await dispatch(
        fetchThunk(API_PATHS.signIn, "post", {
          email: formValues.email,
          password: formValues.password,
        })
      );
      setLoading(false);
      if (res?.code === RESPONSE_STATUS_SUCCESS) {
        dispatch(setUserInfo(res.data));
        if (formValues.rememberMe)
          localStorage.setItem("user", JSON.stringify(res.data));
        else localStorage.removeItem("user");
        navigate("/", { replace: true });
        return;
      }
      setErrorMessages(getErrorMessageResponse(res));
    },
  });

  return (
    <>
      {user?.id ? (
        <Navigate to="/" />
      ) : (
        <Box className={classes.root}>
          <form onSubmit={formik.handleSubmit}>
            <Box className={classes.login}>
              <img
                src="https://storage.googleapis.com/hust-files/images/asset-5large_9.3k.png"
                alt=""
                style={{
                  maxWidth: "250px",
                  margin: "0 auto",
                  textAlign: "center",
                  display: "block",
                }}
              />
              {!!errorMessages && (
                <Typography color="red">{errorMessages}</Typography>
              )}

              <InputFiled label="Email" name="email" form={formik} />
              <PasswordFiled label="Password" name="password" form={formik} />
              <FormControlLabel
                style={{ marginTop: "8px" }}
                control={
                  <Checkbox
                    name="rememberMe"
                    checked={formik.values.rememberMe}
                    onChange={formik.handleChange}
                  />
                }
                label="Lưu thông tin đăng nhập"
              />
              <Box textAlign="center">
                <LoadingButton
                  loading={loading}
                  type="submit"
                  variant="contained"
                >
                  Đăng nhập
                </LoadingButton>
              </Box>
            </Box>
          </form>
        </Box>
      )}
    </>
  );
}
