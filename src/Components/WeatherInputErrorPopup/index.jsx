import React from "react";
import { Card, Typography, IconButton } from "@mui/material";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const InputErrorPopup = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "40px",
        right: 0,
        width: "100vw",
        display: "flex",
        justifyContent: "flex-end",
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <div style={{ pointerEvents: "auto", marginRight: "40px" }}>
        <Card
          sx={{
            minWidth: 320,
            maxWidth: 380,
            background: "linear-gradient(120deg, #facc15, #fbbf24)",
            boxShadow: "0 6px 36px 0 #fbbf24c9",
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            gap: 2,
            px: 3,
            py: 2,
            color: "#fff",
          }}
        >
          <WarningRoundedIcon sx={{ fontSize: 38, color: "#fff" }} />
          <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
            Please enter a city name.
          </Typography>
          <IconButton onClick={onClose} sx={{ color: "#fff" }}>
            <CloseRoundedIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Card>
      </div>
    </div>
  );
};

export default InputErrorPopup;
