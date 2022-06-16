import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "configs/routes";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <Box textAlign="center" mt={5}>
      <Button variant="contained" onClick={() => navigate(ROUTES.todo)}>
        Todo
      </Button>
    </Box>
  );
}
