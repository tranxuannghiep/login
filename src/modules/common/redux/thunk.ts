import { ThunkAction } from "redux-thunk";
import { RootState } from "../../../redux/reducer";
import { Action } from "redux";

import { ACCESS_TOKEN_KEY } from "utils/constants";
const token = localStorage.getItem(ACCESS_TOKEN_KEY);

export function fetchThunk(
  url: string,
  method: "get" | "post" | "delete" | "put" = "get",
  body?: object | FormData,
  auth = true,
  contentType?: string
): ThunkAction<Promise<any>, RootState, null, Action<string>> {
  return async () => {
    const res = await fetch(url, {
      credentials: "include",
      method,
      body: typeof body === "object" ? JSON.stringify(body) : body,
      headers:
        contentType !== "multipart/form-data"
          ? {
              "Content-Type": contentType || "application/json",
              Authorization: token || "",
            }
          : {},
      cache: "no-store",
    });

    const json = await res.json();

    return json;
    // throw new Error('Error');
  };
}
