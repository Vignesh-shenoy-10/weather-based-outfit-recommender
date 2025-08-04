import React from "react";
import { Card, Typography, IconButton } from "@mui/material";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const WeatherErrorPopup = ({ open, message, onClose }) => {
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
            background: "linear-gradient(120deg, #fca5a5, #f87171)",
            boxShadow: "0 6px 36px 0 #f87171c9",
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            gap: 2,
            px: 3,
            py: 2,
            color: "#fff",
          }}
        >
          <ErrorOutlineRoundedIcon sx={{ fontSize: 38, color: "#fff" }} />
          <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
            Oops, city not found!
          </Typography>
          <IconButton onClick={onClose} sx={{ color: "#fff" }}>
            <CloseRoundedIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Card>
      </div>
    </div>
  );
};

export default WeatherErrorPopup;
