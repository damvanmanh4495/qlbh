import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import AppContext from "../AppContext";

type LevelProps = "info" | "warning" | "error" | "success";
interface SnackbarProps {
  open: boolean,
  message?: string,
  level: LevelProps,
}

const AppProvider: React.FC = (props) => {
  const [snackbar, setSnackbar] = useState<SnackbarProps>({
    open: false,
    message: undefined,
    level: "info",
  });

  const [loading, setLoading] = useState(false);

  const levels = {
    info: "info",
    warn: "warning",
    error: "error",
    success: "success",
  };
  const vertical = "top";
  const horizontal = "center";

  const handleOpenNotifier = (isOpen: boolean, message?: string, level: LevelProps = "info") => {
    if (!isOpen) {
      setSnackbar({
        ...snackbar,
        open: isOpen,
      });
      return;
    }

    setSnackbar({
      open: isOpen,
      message: message,
      level: level,
    });
  };

  return (
    <AppContext.Provider
      value={{
        openNotifier: handleOpenNotifier,
        levels: levels,
        loading: loading,
        setLoading: setLoading,
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
        open={snackbar.open}
        onClose={() => handleOpenNotifier(false)}
        autoHideDuration={2300}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => handleOpenNotifier(false)}
          severity={snackbar.level}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
      {props.children}
    </AppContext.Provider>
  );
}

export default AppProvider;
