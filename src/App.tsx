import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./modules/auth/pages/LoginPage";
import HomePage from "./modules/home/pages/HomePage";
import { setUserInfo, setUserLoading } from "./modules/auth/redux/authReducer";
import store from "./redux/configureStore";
import HeaderComponent from "./layout/HeaderComponent";
import PrivateRoute from "./private/PrivateRoute";
import RegisterPage from "./modules/auth/pages/RegisterPage";
import TodoPage from "modules/todos/pages";
import DataTablePage from "modules/dataTable/pages/DataTablePage";
import { ROUTES } from "configs/routes";
import ProfilePage from "modules/auth/pages/ProfilePage";
import { ACCESS_TOKEN_KEY } from "utils/constants";
import { fetchThunk } from "modules/common/redux/thunk";
import { API_PATHS } from "configs/api";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "redux/reducer";
import { Action } from "redux";
import { RESPONSE_STATUS_SUCCESS } from "utils/httpResponseCode";

// const userLocal = localStorage.getItem("user");
const token = localStorage.getItem(ACCESS_TOKEN_KEY);
const getUser = async () => {
  store.dispatch(setUserLoading(true));
  const res = await (
    store.dispatch as ThunkDispatch<RootState, null, Action<string>>
  )(fetchThunk(API_PATHS.userProfile, "get"));
  if (res?.code === RESPONSE_STATUS_SUCCESS) {
    store.dispatch(setUserInfo(res.data));
  } else {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
  store.dispatch(setUserLoading(false));
};

if (token !== null) {
  getUser();
} else {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}
function App() {
  return (
    <>
      <HeaderComponent />
      <Routes>
        <Route
          index
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path={ROUTES.login} element={<LoginPage />} />
        <Route path={ROUTES.register} element={<RegisterPage />} />
        <Route
          path={ROUTES.todo}
          element={
            <PrivateRoute>
              <TodoPage />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.dataTable}
          element={
            <PrivateRoute>
              <DataTablePage />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.profile}
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
