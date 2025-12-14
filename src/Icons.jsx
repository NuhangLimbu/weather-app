import React from "react";
import windIcon from "./assets/Wind.png";
import humidityIconImg from "./assets/humidity.png";
import visibilityIconImg from "./assets/visibility.png";
import sunriseIconImg from "./assets/Sunrise.png";
import sunsetIconImg from "./assets/Sunset.png";

// Generic Icon component (rounded)
const Icon = ({ src, alt }) => (
  <div className="bg-white/20 p-2 rounded-full flex items-center justify-center">
    <img src={src} alt={alt} className="h-8 w-8 rounded-full" />
  </div>
);

export const WindIcon = () => <Icon src={windIcon} alt="wind" />;
export const HumidityIcon = () => <Icon src={humidityIconImg} alt="humidity" />;
export const VisibilityIcon = () => <Icon src={visibilityIconImg} alt="visibility" />;
export const SunriseIcon = () => <Icon src={sunriseIconImg} alt="sunrise" />;
export const SunsetIcon = () => <Icon src={sunsetIconImg} alt="sunset" />;
