import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/reducer";
import { useDispatch, useSelector } from "react-redux";
import { clearUserInfo } from "../modules/auth/redux/authReducer";

export interface HeaderComponentProps {}

export default function HeaderComponent(props: HeaderComponentProps) {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button
            color="inherit"
            onClick={
              user?.id
                ? () => {
                    dispatch(clearUserInfo());
                    localStorage.removeItem("user");
                  }
                : () => navigate("/login")
            }
          >
            {user?.id ? "Logout" : "Login"}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
