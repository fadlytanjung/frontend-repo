import { Button } from "@mui/material";

export default function UpdateButton({ loading }: { loading: boolean }) {
  return (
    <Button type="submit" variant="outlined" loading={loading}>
      Update
    </Button>
  );
}
