"use client";

import { ThemeProvider } from "@mui/material/styles";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import NotificationPopup from "@/components/Notification";
import ModeSwitch from "@/components/ModeSwitch";
import theme from "@/theme/theme";

export default function RootProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ModeSwitch />
        <NotificationPopup />
        {children}
      </ThemeProvider>
    </Provider>
  );
}
