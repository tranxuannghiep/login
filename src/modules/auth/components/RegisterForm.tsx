import { LoadingButton } from "@mui/lab";
import { Box, Button, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import * as yup from "yup";
import AsyncSelectFiled from "../../../components/form-controls/AsyncSelectFiled/AsyncSelectFiled";
import InputFiled from "../../../components/form-controls/InputFiled";
import PasswordFiled from "../../../components/form-controls/PasswordFiled";
import SelectFiled from "../../../components/form-controls/SelectFiled/SelectFiled";
import { RootState } from "../../../redux/reducer";
import { getErrorMessageResponse } from "../../../utils";
import { API_PATHS } from "./../../../configs/api";
import { ILocationParams, ISignUpParams } from "./../../../models/auth";
import { RESPONSE_STATUS_SUCCESS } from "./../../../utils/httpResponseCode";
import { fetchThunk } from "./../../common/redux/thunk";
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
  const dispatch =
    useDispatch<ThunkDispatch<RootState, null, Action<string>>>();
  const [regionList, setRegionList] = useState<ILocationParams[]>([]);
  const [stateList, setSateList] = useState<ILocationParams[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState("");

  const onChangeId = useCallback(
    (id: number) => {
      const getLocationById = async () => {
        // await setSateList([]);
        const json = await dispatch(
          fetchThunk(API_PATHS.getLocationByPid(id), "get")
        );
        if (json?.code === RESPONSE_STATUS_SUCCESS) {
          setSateList(json.data);
          return;
        }
      };
      getLocationById();
    },
    [dispatch]
  );
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
    gender: yup.string().required("Gender is required"),
    region: yup.string().required("Region is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
      name: "",
      gender: "",
      region: "",
      state: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (formValues: ISignUpParams) => {
      setErrorMessages("");
      setLoading(true);
      const res = await dispatch(
        fetchThunk(API_PATHS.signUp, "post", formValues)
      );
      setLoading(false);
      if (res?.code === RESPONSE_STATUS_SUCCESS) {
        alert("Chúc mừng bạn đã đăng ký thành công");

        navigate("/login");
        return;
      }
      setErrorMessages(getErrorMessageResponse(res));
    },
  });
  const getLocation = useCallback(async () => {
    const json = await dispatch(fetchThunk(API_PATHS.getLocation, "get"));
    if (json?.code === RESPONSE_STATUS_SUCCESS) {
      setRegionList(json.data);
      return;
    }
  }, [dispatch]);
  useEffect(() => {
    getLocation();
  }, [getLocation]);

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
          {!!errorMessages && (
            <Typography color="red">{errorMessages}</Typography>
          )}

          <InputFiled label="Địa chỉ Email" name="email" form={formik} />
          <PasswordFiled label="Mật khẩu" name="password" form={formik} />
          <PasswordFiled
            label="Xác nhận lại mật khẩu"
            name="repeatPassword"
            form={formik}
          />
          <InputFiled label="Họ và tên" name="name" form={formik} />
          <SelectFiled label="Giới tính" name="gender" form={formik} />
          <AsyncSelectFiled
            label="Quốc gia"
            name="region"
            form={formik}
            items={regionList}
            onChangeId={onChangeId}
          />

          <AsyncSelectFiled
            label="Thành phố"
            name="state"
            form={formik}
            items={stateList}
          />

          <Box textAlign="center">
            <LoadingButton loading={loading} type="submit" variant="contained">
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
