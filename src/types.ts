// Collection of types from HA frontend

import type { LovelaceCardConfig } from "custom-card-helpers";

// From frontend/src/panels/lovelace/types.ts
export interface LovelaceGridOptions {
  columns?: number | "full";
  rows?: number | "auto";
  max_columns?: number;
  min_columns?: number;
  min_rows?: number;
  max_rows?: number;
}

export interface WeatherForecastExtendedConfig extends LovelaceCardConfig {
  type: "custom:weather-forecast-extended-card";
  entity: string;
  name?: string;
  hourly_forecast?: boolean;
  daily_forecast?: boolean;
  orientation?: "vertical" | "horizontal";
}
