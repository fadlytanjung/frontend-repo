import { Typography } from "@mui/material";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <Typography>
        Navigate to Setting if you want to know user information
      </Typography>
      <Typography>
        Navigate to Users if you want to show and update user data
      </Typography>
    </div>
  );
}
