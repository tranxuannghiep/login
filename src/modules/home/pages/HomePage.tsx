import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "configs/routes";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="250px"
      margin="40px auto"
    >
      <Button variant="contained" onClick={() => navigate(ROUTES.todo)}>
        Todo
      </Button>
      <Button variant="contained" onClick={() => navigate(ROUTES.dataTable)}>
        PayRoll
      </Button>
    </Box>
  );
}
