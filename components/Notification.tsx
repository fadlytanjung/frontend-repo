import React, { useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "@/store/actions";
import { UserState } from "@/store/reducers";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/apis/userApi";

function Notification(props: AlertProps) {
  return <MuiAlert elevation={6} variant="outlined" {...props} />;
}

const NotificationPopup = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const error = useSelector((state: { user: UserState }) => state.user.error);
  const success = useSelector(
    (state: { user: UserState }) => state.user.success
  );

  useEffect(() => {
    const logout = async () => {
      if (typeof window !== "undefined") {
        await logoutUser();
        router.replace("/login");
      }
    };
    if (error === "Failed to fetch user data") {
      logout();
    }
  }, [error]);

  return (
    <Snackbar
      open={!!error || !!success}
      autoHideDuration={1000}
      onClose={() => {}}
      key="bottom-right"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <div>
        <Notification
          onClose={() => {
            dispatch(setError(null));
          }}
          severity={error ? "error" : "success"}
        >
          {error || success}
        </Notification>
      </div>
    </Snackbar>
  );
};

export default NotificationPopup;
