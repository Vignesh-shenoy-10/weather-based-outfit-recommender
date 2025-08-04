import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import WbSunnyRoundedIcon from "@mui/icons-material/WbSunnyRounded";
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import AirRoundedIcon from "@mui/icons-material/Air";
import OpacityRoundedIcon from "@mui/icons-material/Opacity";
import UmbrellaRoundedIcon from "@mui/icons-material/UmbrellaRounded";
import CheckroomRoundedIcon from "@mui/icons-material/Checkroom";
import WeatherErrorPopup from "../WeatherErrorPopup";
import ReactAnimatedWeather from "react-animated-weather";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import InputErrorPopup from "../WeatherInputErrorPopup";

const API_KEY = "6aa2b5cd48b2524ab26a4fb65f40c95b";

function getAnimatedWeatherIcon(main) {
  if (!main) return "CLOUDY";
  main = main.toLowerCase();
  if (main.includes("rain")) return "RAIN";
  if (main.includes("snow")) return "SNOW";
  if (main.includes("storm") || main.includes("thunder")) return "SLEET";
  if (main.includes("clear") || main.includes("sun")) return "CLEAR_DAY";
  if (main.includes("cloud")) return "CLOUDY";
  if (main.includes("fog") || main.includes("mist")) return "FOG";
  return "CLOUDY";
}

function getOutfitRecommendation(weather) {
  if (!weather || !weather.weather || !weather.weather[0]) return null;
  const main = weather.weather[0].main.toLowerCase();
  if (
    main.includes("rain") ||
    main.includes("storm") ||
    main.includes("clouds")
  ) {
    return {
      text: "Take an umbrella",
      icon: (
        <UmbrellaRoundedIcon
          sx={{
            color: "#0ea5e9",
            fontSize: 96,
            mb: 1,
            display: "block",
            mx: "auto",
          }}
        />
      ),
    };
  }
  if (main.includes("sun") || main.includes("clear")) {
    return {
      text: "Sunglasses would be useful today",
      icon: (
        <WbSunnyRoundedIcon
          sx={{
            color: "#fbbf24",
            fontSize: 96,
            mb: 1,
            display: "block",
            mx: "auto",
          }}
        />
      ),
    };
  }
  if (
    main.includes("snow") ||
    main.includes("cold") ||
    weather.main.temp < 15
  ) {
    return {
      text: "Suggested to wear a jacket",
      icon: (
        <CheckroomRoundedIcon
          sx={{
            color: "#2563eb",
            fontSize: 96,
            mb: 1,
            display: "block",
            mx: "auto",
          }}
        />
      ),
    };
  }
  return {
    text: "Dress comfortably for the day's weather",
    icon: null,
  };
}

function getWeatherContextText(weather) {
  if (!weather || !weather.weather || !weather.weather[0]) return "";

  const main = weather.weather[0].main.toLowerCase();
  const location = `${weather.name}, ${weather.sys.country}`;

  if (main.includes("rain") || main.includes("storm")) {
    return `The Skies are weeping at ${location}.`;
  }
  if (main.includes("sun") || main.includes("clear")) {
    return `The Sun is blazing at ${location}.`;
  }
  if (main.includes("snow")) {
    return `Snowflakes are dancing at ${location}.`;
  }
  if (main.includes("cloud")) {
    return `Clouds are rolling in over at ${location}.`;
  }
  return `Weather update for ${location}.`;
}

function WeatherDashboard() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [inputError, setInputError] = useState(false);

  const fetchWeather = async () => {
    if (!city) {
      setInputError(true);
      return;
    }
    setInputError(false);
    setError("");
    setWeather(null);
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = () => {
    if (!weather) return "";
    const dt = new Date(weather.dt * 1000);
    return `${dt.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })} ${dt.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-tr from-blue-100 to-blue-300">
      <div
        className="flex flex-col items-center"
        style={{ marginTop: "10px", marginLeft: "500px" }}
      >
        <form
          className="flex items-center"
          onSubmit={(e) => {
            e.preventDefault();
            fetchWeather();
          }}
        >
          <TextField
            placeholder="Search for a city"
            variant="outlined"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: city ? (
                <InputAdornment position="end">
                  <CloseRoundedIcon
                    onClick={() => setCity("")}
                    sx={{
                      cursor: "pointer",
                      color: "#0ea5e9",
                      fontSize: 28,
                      "&:hover": { color: "#232e4a" },
                    }}
                  />
                </InputAdornment>
              ) : null,
            }}
            sx={{
              width: 300,
              borderRadius: 8,
              backgroundColor: "white",
              boxShadow: "0 0 6px #dbeafe",
              "& .MuiOutlinedInput-root": {
                borderRadius: 8,
              },
              "& .MuiOutlinedInput-root.Mui-focused": {
                borderColor: "#2563eb",
                boxShadow: "0 0 8px #2563eb",
              },
              input: {
                fontSize: 18,
                padding: "14px 14px",
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            sx={{
              marginLeft: "10px",
              borderRadius: "999px",
              fontWeight: "bold",
              paddingX: 4,
              whiteSpace: "nowrap",
              height: "56px",
              backgroundColor: "#232e4a",
              color: "#fff",
              boxShadow: "0 2px 10px rgba(35,46,74,0.14)",
              "&:hover": {
                backgroundColor: "#37507b",
              },
              textTransform: "none",
              fontSize: "18px",
              letterSpacing: "0.02em",
            }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={22} color="inherit" />
            ) : (
              "Search"
            )}
          </Button>
        </form>
        {error && (
          <Typography color="error" className="mt-2 text-center">
            {error}
          </Typography>
        )}
      </div>
      <WeatherErrorPopup open={showError} onClose={() => setShowError(false)} />
      <InputErrorPopup open={inputError} onClose={() => setInputError(false)} />
      {weather ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "2rem",
            alignItems: "stretch",
            marginTop: "10px",
          }}
        >
          <Card
            className="mx-auto"
            sx={{
              maxWidth: 370,
              minWidth: 320,
              height: 500,
              borderRadius: 6,
              padding: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background: "linear-gradient(145deg, #232e4a 55%, #37507b 100%)",
              boxShadow: "0 8px 38px -8px #0ea5e9",
              color: "#fff",
              marginLeft: "25px",
            }}
          >
            <CardContent className="flex flex-col items-center w-full">
              <div style={{ marginBottom: 18 }}>
                <ReactAnimatedWeather
                  icon={getAnimatedWeatherIcon(weather.weather[0].main)}
                  color="#fff"
                  size={100}
                  animate={true}
                />
              </div>
              <Typography
                sx={{
                  fontSize: 56,
                  fontWeight: "bold",
                  color: "#fff",
                  mb: 1,
                  textAlign: "center",
                }}
              >
                {Math.round(weather.main.temp)}°C
              </Typography>
              <Typography
                variant="h6"
                className="capitalize"
                sx={{ mb: 2, color: "#fff" }}
              >
                {weather.weather[0].description}
              </Typography>
              <div className="flex flex-col justify-center items-center text-white w-full mb-2">
                <div className="flex items-center gap-2 mb-2">
                  <FmdGoodRoundedIcon fontSize="small" sx={{ color: "#fff" }} />
                  <Typography variant="body1" sx={{ color: "#fff" }}>
                    {weather.name}, {weather.sys.country}
                  </Typography>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarMonthRoundedIcon
                    fontSize="small"
                    sx={{ color: "#fff" }}
                  />
                  <Typography
                    variant="body1"
                    sx={{ color: "#fff", fontWeight: 600 }}
                  >
                    {formatDateTime()}
                  </Typography>
                </div>
              </div>
              <div className="flex gap-10 justify-center mt-3 text-white font-semibold w-full">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1">
                    <AirRoundedIcon
                      fontSize="small"
                      sx={{ color: "#60a5fa" }}
                    />
                    <Typography sx={{ color: "#60a5fa", fontWeight: 600 }}>
                      Wind
                    </Typography>
                  </div>
                  <Typography>{weather.wind.speed} m/s</Typography>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1">
                    <OpacityRoundedIcon
                      fontSize="small"
                      sx={{ color: "#60a5fa" }}
                    />
                    <Typography sx={{ color: "#60a5fa", fontWeight: 600 }}>
                      Humidity
                    </Typography>
                  </div>
                  <Typography>{weather.main.humidity}%</Typography>
                </div>
              </div>
            </CardContent>
            <style>
              {`
              @keyframes fadein {
                from { opacity: 0; transform: translateY(-24px);}
                to { opacity: 1; transform: translateY(0);}
              }
            `}
            </style>
          </Card>
          <Card
            sx={{
              width: 700,
              minHeight: 420,
              borderRadius: 6,
              padding: 6,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              background: "linear-gradient(135deg, #f0f8ff 60%, #e0edfa 100%)",
              boxShadow: "0 8px 38px -12px #3b82f6",
              color: "#232e4a",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 4,
                color: "#1e293b",
                letterSpacing: ".01em",
                textShadow: "0 2px 12px #fff9",
                textAlign: "center",
              }}
            >
              Outfit Recommendation
            </Typography>
            {weather && (
              <div className="flex flex-col items-center justify-center">
                <Typography
                  variant="h6"
                  sx={{
                    color: "#0284c7",
                    fontWeight: 500,
                    mb: 2,
                    textAlign: "center",
                  }}
                >
                  {getWeatherContextText(weather)}
                </Typography>
                {getOutfitRecommendation(weather).icon}
                <Typography
                  variant="h5"
                  sx={{
                    color: "#0284c7",
                    fontWeight: 600,
                    mt: 3,
                    letterSpacing: ".01em",
                    textAlign: "center",
                    textShadow: "0 1px 4px #38bdf899",
                  }}
                >
                  {getOutfitRecommendation(weather).text}
                </Typography>
              </div>
            )}
          </Card>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "32px",
          }}
        >
          <Card
            sx={{
              width: 1100,
              minHeight: 420,
              borderRadius: 6,
              padding: 6,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              background: "linear-gradient(135deg, #e0f2fe 60%, #bae6fd 100%)",
              boxShadow: "0 8px 38px -12px #60a5fa",
              color: "#0369a1",
              textAlign: "center",
            }}
          >
            <Typography variant="h3" sx={{ mb: 2 }}>
              Hello!
            </Typography>
            <Typography variant="h6">
              Discover the latest local weather and get instant outfit
              recommendations. Type your city in the box above and let’s help
              you dress for the day!
            </Typography>
          </Card>
        </div>
      )}
    </div>
  );
}

export default WeatherDashboard;
