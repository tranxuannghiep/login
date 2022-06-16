import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./modules/auth/pages/LoginPage";
import HomePage from "./modules/home/pages/HomePage";
import { setUserInfo } from "./modules/auth/redux/authReducer";
import store from "./redux/configureStore";
import HeaderComponent from "./layout/HeaderComponent";
import PrivateRoute from "./private/PrivateRoute";
import RegisterPage from "./modules/auth/pages/RegisterPage";
import TodoPage from "modules/todos/pages";

const userLocal = localStorage.getItem("user");
if (userLocal !== null) store.dispatch(setUserInfo(JSON.parse(userLocal)));
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
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/todo"
          element={
            <PrivateRoute>
              <TodoPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
