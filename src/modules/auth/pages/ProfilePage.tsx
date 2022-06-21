import { Box } from "@mui/material";
import UserDetail from "../components/UserDetail";

export interface ProfilePageProps {}

export default function ProfilePage(props: ProfilePageProps) {
  return (
    <Box>
      <UserDetail />
    </Box>
  );
}
