"use client";
import * as React from "react";
import { useColorScheme } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

export default function ModeSwitch() {
  const { mode, setMode } = useColorScheme();
  const [value, setValue] = React.useState(false);

  const onChange = (e: boolean) => {
    setValue(e);
    setMode(e ? "dark" : "system");
  };
  if (!mode) {
    return null;
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        p: 1,
      }}
    >
      <InputLabel id="mode-select-label">Dark Mode</InputLabel>
      <FormControl>
        <Switch
          checked={value}
          id="mode-select-label"
          onChange={(e) => onChange(e.target.checked)}
        />
      </FormControl>
    </Box>
  );
}
