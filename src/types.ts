// Collection of types from HA frontend

import type { ActionConfig, LovelaceCardConfig } from "custom-card-helpers";

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
  header_temperature_entity?: string;
  header_chips?: HeaderChip[];
  header_attributes?: string[];
  show_header?: boolean;
  hourly_forecast?: boolean;
  daily_forecast?: boolean;
  orientation?: "vertical" | "horizontal";
  show_sun_times?: boolean;
  sun_use_home_coordinates?: boolean;
  sun_latitude?: number | string;
  sun_longitude?: number | string;
  use_night_header_backgrounds?: boolean;
  daily_min_gap?: number;
  hourly_min_gap?: number;
  header_tap_action_temperature?: ActionConfig;
  header_tap_action_condition?: ActionConfig;
  hourly_extra_attribute?: string;
  hourly_extra_attribute_unit?: string;
  daily_extra_attribute?: string;
  daily_extra_attribute_unit?: string;
}

export interface SunCoordinates {
  latitude: number;
  longitude: number;
}

export type SunEventType = "sunrise" | "sunset";

export type SunTimesByDay = Record<string, Partial<Record<SunEventType, number>>>;

export type HeaderChip = AttributeHeaderChip | TemplateHeaderChip;

export interface AttributeHeaderChip {
  type: "attribute";
  attribute: string;
  icon?: string;
  tap_action?: ActionConfig;
}

export interface TemplateHeaderChip {
  type: "template";
  template: string;
  icon?: string;
  tap_action?: ActionConfig;
}
