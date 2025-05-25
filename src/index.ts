import { WeatherForecastExtended } from "./weather-forecast-extended";

declare global {
  interface Window {
    customCards: Array<Object>;
  }
}

customElements.define("weather-forecast-extended-card", WeatherForecastExtended);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "weather-forecast-extended-card",
  name: "Weather Forecast Extended",
  description: "Weather forecast similar to the default HA card, but with some additional information",
});
