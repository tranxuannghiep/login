import { PhotoCamera } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputLabel,
  Typography,
} from "@mui/material";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducer";
import "./UserDetail.scss";
import { API_PATHS } from "configs/api";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { ACCESS_TOKEN_KEY, APIUrl } from "utils/constants";
import axios from "axios";
import { RESPONSE_STATUS_SUCCESS } from "utils/httpResponseCode";
import { setUserInfo } from "../redux/authReducer";
import { fetchThunk } from "modules/common/redux/thunk";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { generateAvatarUpload } from "utils/upload";
import { LoadingButton } from "@mui/lab";
export interface UserDetailProps {}

export default function UserDetail(props: UserDetailProps) {
  const { user } = useSelector((state: RootState) => state.authReducer);
  const dispatch =
    useDispatch<ThunkDispatch<RootState, null, Action<string>>>();
  const imgRef = useRef<any>(null);
  const [image, setImage] = useState(user?.avatar);
  const [openModal, setOpenModal] = useState(false);
  const [crop, setCrop] = useState<any>({
    unit: "%",
    width: 30,
    aspect: 1,
  });
  const [completedCrop, setCompletedCrop] = useState<any>(null);
  const previewCanvasRef = useRef<any>(null);
  const onChooseAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    // if (!files) return;
    // const file = files[0];
    // const formData = new FormData();
    // formData.append("file", file, file.name);
    // // const json = await dispatch(
    // //   fetchThunk(API_PATHS.userProfile, "put", formData, true, "form-data")
    // // );
    // const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    // // console.log(Cookies.get(ACCESS_TOKEN_KEY));
    // const config = {
    //   headers: {
    //     "content-type": "multipart/form-data",
    //     Authorization: token || "",
    //   },
    // };
    // await axios.put(API_PATHS.userProfile, formData, config);

    // const json = await dispatch(fetchThunk(API_PATHS.userProfile, "get"));
    // if (json?.code === RESPONSE_STATUS_SUCCESS) {
    //   dispatch(setUserInfo(json.data));
    // }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    if (files !== null && files.length) reader.readAsDataURL(files[0]);
    setOpenModal(true);
  };
  const onLoad = useCallback((img: any) => {
    imgRef.current = img;
  }, []);
  const uploadAvatar = async () => {
    const file = await generateAvatarUpload(
      previewCanvasRef.current,
      completedCrop
    );
    if (file) {
      console.log(file);
      const formData = new FormData();
      formData.append("file", file, file.name);
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token || "",
        },
      };
      await axios.put(API_PATHS.userProfile, formData, config);
      const json = await dispatch(fetchThunk(API_PATHS.userProfile, "get"));
      if (json?.code === RESPONSE_STATUS_SUCCESS) {
        dispatch(setUserInfo(json.data));
      }
      // if (json.data && json.data.code === RESPONSE_STATUS_SUCCESS) {
      //   dispatch(setUserInfo(json.data.data));
      // }
    }
  };
  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop]);
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Box width="300px" border="1px solid #ccc" borderRadius="10px" p={2}>
        <Box className="profilepic">
          <img
            src={
              user?.avatar
                ? `${APIUrl}/${user?.avatar}`
                : "http://bim.gov.vn/Upload/images/staffs/avatar-default.jpg"
            }
            className="profilepic__image"
            alt="avatar_url"
          />

          <Box className="profilepic__content">
            <label htmlFor="icon-button-file">
              <input
                accept="image/*"
                id="icon-button-file"
                type="file"
                onChange={onChooseAvatar}
                style={{ display: "none" }}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera color="disabled" />
              </IconButton>
            </label>
          </Box>
        </Box>
        <Box mt={1}>
          <InputLabel>Email</InputLabel>
          <Typography variant="body1">{user?.email}</Typography>
        </Box>
        <Box mt={1}>
          <InputLabel>User Name</InputLabel>
          <Typography variant="body1">{user?.name}</Typography>
        </Box>
        <Box mt={1}>
          <InputLabel>Gender</InputLabel>
          <Typography variant="body1">{user?.gender}</Typography>
        </Box>
        <Box mt={1}>
          <InputLabel>Region</InputLabel>
          <Typography variant="body1">{user?.region}</Typography>
        </Box>
        <Box mt={1}>
          <InputLabel>State</InputLabel>
          <Typography variant="body1">{user?.state}</Typography>
        </Box>
      </Box>
      <Dialog
        open={openModal}
        disableEscapeKeyDown
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        onClose={(_, reason) => {
          if (reason !== "backdropClick") {
            setOpenModal(false);
          }
        }}
      >
        <Box padding={1.5}>
          <DialogTitle
            id="alert-dialog-title"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Typography>Upload</Typography>
          </DialogTitle>
          <DialogContent>
            <ReactCrop
              src={image ? image : ""}
              crop={crop}
              onChange={(newCrop: any) => {
                // console.log("====================================");
                // console.log(newCrop);
                // console.log("====================================");
                setCrop(newCrop);
              }}
              onImageLoaded={onLoad}
              onComplete={(c) => setCompletedCrop(c)}
            />
            <div>
              <canvas
                ref={previewCanvasRef}
                // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                style={{
                  width: Math.round(completedCrop?.width ?? 0),
                  height: Math.round(completedCrop?.height ?? 0),
                }}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <LoadingButton
              variant="outlined"
              // loading={loading}
              onClick={() => {
                setOpenModal(false);
                uploadAvatar();
              }}
            >
              Xác nhận
            </LoadingButton>
            <Button
              // disabled={loading}
              variant="contained"
              onClick={() => {
                setOpenModal(false);
              }}
              autoFocus
            >
              Hủy
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
