// Collection of functions from HA frontend
import { FrontendLocaleData } from "custom-card-helpers";
import type { HassConfig } from "home-assistant-js-websocket";
import memoizeOne from "memoize-one";

// Custom Card Helper FrontEndLocaleData type is missing new timeZone proeprty
interface LocaleSettings extends FrontendLocaleData {
  time_zone: string;
}

// From frontend/src/common/datetime/format_date.ts
export const formatDateWeekdayShort = (
  dateObj: Date,
  locale: LocaleSettings,
  config: HassConfig
) => formatDateWeekdayShortMem(locale, config.time_zone).format(dateObj);

const formatDateWeekdayShortMem = memoizeOne(
  (locale: LocaleSettings, serverTimeZone: string) =>
    new Intl.DateTimeFormat(locale.language, {
      weekday: "short",
      timeZone: locale.time_zone === 'server' ? serverTimeZone : undefined
    })
)

// From frontend/src/common/datetime/format_time.ts
export const formatTime = (
  dateObj: Date,
  locale: LocaleSettings,
  config: HassConfig
) => formatTimeMem(locale, config.time_zone).format(dateObj);

const formatTimeMem = memoizeOne(
  (locale: LocaleSettings, serverTimeZone: string) =>
    new Intl.DateTimeFormat(locale.language, {
      hour: "numeric",
      minute: "numeric",
      hourCycle: useAmPm(locale) ? "h12" : "h23",
      timeZone: locale.time_zone === 'server' ? serverTimeZone : undefined
    })
);

// from frontend/src/common/datetime/use_am_pm.ts
export enum TimeFormat {
  language = "language",
  system = "system",
  am_pm = "12",
  twenty_four = "24",
}

export const useAmPm = memoizeOne((locale: FrontendLocaleData): boolean => {
  if (
    locale.time_format === TimeFormat.language ||
    locale.time_format === TimeFormat.system
  ) {
    const testLanguage =
      locale.time_format === TimeFormat.language ? locale.language : undefined;
    const test = new Date("January 1, 2023 22:00:00").toLocaleString(
      testLanguage
    );
    return test.includes("10");
  }

  return locale.time_format === TimeFormat.am_pm;
});

// Missing functions in HA, added manually
export const formatDateDayTwoDigit = (
  dateObj: Date,
  locale: LocaleSettings,
  config: HassConfig
) => formatDateDayTwoDigitMem(locale, config.time_zone).format(dateObj);

const formatDateDayTwoDigitMem = memoizeOne(
  (locale: LocaleSettings, serverTimeZone: string) =>
    new Intl.DateTimeFormat(locale.language, {
      day: "2-digit",
      timeZone: locale.time_zone === 'server' ? serverTimeZone : undefined
    })
)

// Hour without additional text like "am", or "Uhr" in some localisations
export const formatHour = (
  dateObj: Date,
  locale: LocaleSettings,
  config: HassConfig
) => {
  const parts = formatHourMem(locale, config.time_zone).formatToParts(dateObj);
  console.log(parts);
  return parts.find(part => part.type === 'hour').value;
}

// am/pm, ...
export const formatDayPeriod = (
  dateObj: Date,
  locale: LocaleSettings,
  config: HassConfig
) => {
  const parts = formatHourMem(locale, config.time_zone).formatToParts(dateObj);
  console.log(parts);
  return parts.find(part => part.type === 'dayPeriod')?.value;
}

const formatHourMem = memoizeOne(
  (locale: LocaleSettings, serverTimeZone: string) =>
    new Intl.DateTimeFormat(locale.language, {
      hour: "2-digit",
      //minute: "2-digit",
      hourCycle: useAmPm(locale) ? "h12" : "h23",
      timeZone: locale.time_zone === 'server' ? serverTimeZone : undefined
    })
);

export const isNewDay = (
  dateObj: Date,
  config: HassConfig
) => {
  const formatter = new Intl.DateTimeFormat("de-DE", {
    hour: '2-digit',
    timeZone: config.time_zone,
    hour12: false
  });

  const parts = formatter.formatToParts(dateObj);
  const hourPart = parts.find(part => part.type === 'hour');

  return hourPart.value === "00";
}



