import React from "react";

// Your GIFs
import ClearGif from "./assets/Clear.gif";
import CloudsGif from "./assets/Clouds.gif";
import RainGif from "./assets/Rain.gif";
import SnowGif from "./assets/Snow.gif";
import ThunderGif from "./assets/Thunderstorm.gif";
import HazeGif from "./assets/Haze.gif";
import FogGif from "./assets/Fog.gif";

// Default video
import VideoBg from "./assets/video1.mp4";

const WeatherBackground = ({ weather }) => {
  let background;

  if (!weather) {
    return (
      <div className="fixed inset-0 z-0 overflow-hidden">
        <video autoPlay loop muted className="w-full h-full object-cover">
          <source src={VideoBg} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/20" />
      </div>
    );
  }

  const code = weather.weathercode;

  if (code === 0) background = ClearGif;
  else if (code >= 1 && code <= 3) background = CloudsGif;
  else if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) background = RainGif;
  else if (code >= 71 && code <= 77) background = SnowGif;
  else if (code >= 95 && code <= 99) background = ThunderGif;
  else if (code >= 45 && code <= 48) background = FogGif;
  else background = HazeGif;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <img
        key={code}
        src={background}
        alt="weather-background"
        className="w-full h-full object-cover transition-opacity duration-1000"
      />
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
};

export default WeatherBackground;
