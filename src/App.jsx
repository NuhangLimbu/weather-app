import React, { useState } from "react";
import WeatherBackground from "./WeatherBackground";
import {
  WindIcon,
  HumidityIcon,
  VisibilityIcon,
  SunriseIcon,
  SunsetIcon,
} from "./Icons";

// Small weather GIFs (your assets)
import ClearIcon from "./assets/Clear.gif";
import CloudsIcon from "./assets/Clouds.gif";
import RainIcon from "./assets/Rain.gif";
import SnowIcon from "./assets/Snow.gif";
import ThunderIcon from "./assets/Thunderstorm.gif";
import HazeIcon from "./assets/Haze.gif";
import FogIcon from "./assets/Fog.gif";

function App() {
  const [weather, setWeather] = useState(null);
  const [daily, setDaily] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    try {
      setError("");
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${city}`
      );
      const geoData = await geoRes.json();
      if (!geoData[0]) throw new Error("City not found");

      const lat = parseFloat(geoData[0].lat);
      const lon = parseFloat(geoData[0].lon);

      // Correct Open-Meteo API: daily only supports certain fields
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=sunrise,sunset,visibility_mean&timezone=auto`
      );
      const data = await res.json();

      if (!data.current_weather) throw new Error("Weather data unavailable");

      setWeather({ ...data.current_weather, city: geoData[0].display_name });
      setDaily(data.daily);
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setDaily(null);
    }
  };

  const getWeatherIcon = () => {
    if (!weather) return null;
    const code = weather.weathercode;
    if (code === 0) return ClearIcon;
    if (code >= 1 && code <= 3) return CloudsIcon;
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return RainIcon;
    if (code >= 71 && code <= 77) return SnowIcon;
    if (code >= 95 && code <= 99) return ThunderIcon;
    if (code >= 45 && code <= 48) return FogIcon;
    return HazeIcon;
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 relative">
      <WeatherBackground weather={weather} />

      <div className="relative z-10 backdrop-blur-md rounded-xl shadow-2xl p-8 max-w-md w-full text-white border border-white/30 transition-all bg-black/30">
        <h1 className="text-3xl font-bold mb-6 text-center">Weather App</h1>

        {!weather ? (
          <>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city"
              className="w-full p-3 mb-4 rounded text-white"
            />
            <button
              onClick={fetchWeather}
              className="w-full bg-blue-700 hover:bg-blue-800 p-2 rounded font-semibold"
            >
              Get Weather
            </button>
            {error && <p className="text-red-400 mt-4">{error}</p>}
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center">{weather.city}</h2>
            <p className="text-xl mt-2 text-center">
              Temperature: {weather.temperature?.toFixed(1) ?? "N/A"}°C
            </p>

            {/* Bouncing weather GIF fully rounded */}
            {getWeatherIcon() && (
              <div className="mx-auto my-4 p-2 bg-white/20 rounded-full w-24 h-24 flex items-center justify-center">
                <img
                  src={getWeatherIcon()}
                  alt="weather-icon"
                  className="w-20 h-20 rounded-full animate-bounce"
                />
              </div>
            )}

            {/* Additional info */}
            <div className="flex justify-around mt-4 flex-wrap gap-4">
              <div className="flex flex-col items-center">
                <SunriseIcon />
                <span className="text-sm mt-1">{daily?.sunrise?.[0]?.slice(11,16) ?? "N/A"}</span>
              </div>

              <div className="flex flex-col items-center">
                <SunsetIcon />
                <span className="text-sm mt-1">{daily?.sunset?.[0]?.slice(11,16) ?? "N/A"}</span>
              </div>

              <div className="flex flex-col items-center">
                <VisibilityIcon />
                <span className="text-sm mt-1">{daily?.visibility_mean?.[0] ?? "N/A"} km</span>
              </div>

              <div className="flex flex-col items-center">
                <HumidityIcon />
                <span className="text-sm mt-1">{weather?.humidity ?? "N/A"}%</span>
              </div>

              <div className="flex flex-col items-center">
                <WindIcon />
                <span className="text-sm mt-1">{weather?.windspeed ?? "N/A"} km/h</span>
              </div>
            </div>

            <button
              onClick={() => {
                setWeather(null);
                setCity("");
                setDaily(null);
              }}
              className="mt-4 w-full bg-purple-700 hover:bg-purple-800 p-2 rounded font-semibold"
            >
              New Search
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
