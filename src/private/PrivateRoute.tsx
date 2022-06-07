import * as React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/reducer";

export interface PrivateRouteProps {
  children: React.ReactElement;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user } = useSelector((state: RootState) => state.authReducer);
  return user?.id ? children : <Navigate to="/login" />;
}
