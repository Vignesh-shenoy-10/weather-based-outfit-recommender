import React, { useState, useMemo } from "react";
import { Autocomplete, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import debounce from "lodash.debounce";

const API_KEY = "6aa2b5cd48b2524ab26a4fb65f40c95b";

export default function CityAutoComplete({ city, setCity }) {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const fetchCities = useMemo(
    () =>
      debounce(async (input) => {
        if (!input) {
          setOptions([]);
          return;
        }
        try {
          const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
              input
            )}&limit=5&appid=${API_KEY}`
          );
          const data = await response.json();
          setOptions(
            data.map((item) => ({
              label: `${item.name}${item.state ? ", " + item.state : ""}, ${
                item.country
              }`,
              value: item.name,
            }))
          );
        } catch {
          setOptions([]);
        }
      }, 400),
    []
  );

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
    fetchCities(newInputValue);
  };

  return (
    <Autocomplete
      freeSolo
      options={options}
      getOptionLabel={(option) => option.label || ""}
      value={city ? { label: city, value: city } : null}
      inputValue={inputValue}
      onInputChange={(event, newInputValue, reason) => {
        if (reason === "input") {
          setInputValue(newInputValue);
          fetchCities(newInputValue);
        }
        // When the clear icon or other programmatic changes
        if (reason === "clear") {
          setInputValue("");
          setCity("");
          setOptions([]);
        }
      }}
      onChange={(e, newValue) => {
        if (!newValue) {
          setCity("");
          setInputValue("");
        } else if (typeof newValue === "string") {
          setCity(newValue);
          setInputValue(newValue);
        } else {
          setCity(newValue.value);
          setInputValue(newValue.label);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search for a city"
          variant="outlined"
          size="medium"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: inputValue ? (
              <InputAdornment position="end">
                <CloseRoundedIcon
                  onClick={() => {
                    setCity("");
                    setInputValue("");
                    setOptions([]);
                  }}
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
      )}
    />
  );
}
