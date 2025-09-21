import sunnyConditionImage from './img/sunny.jpg';
import clearNightConditionImage from './img/clear-night.jpg';
import pouringConditionImage from './img/pouring.jpg';
import pouringNightConditionImage from './img/pouring-night.jpg';
import partlyCloudyConditionImage from './img/partly-cloudy.jpg';
import partlyCloudyNightConditionImage from './img/partly-cloudy-night.jpg';
import fogConditionImage from './img/fog.jpg';
import fogNightConditionImage from './img/fog-night.jpg';
import hailConditionImage from './img/hail.jpg';
import hailNightConditionImage from './img/hail-night.jpg';
import lightningRainyConditionImage from './img/lightning-rainy.jpg';
import lightningRainyNightConditionImage from './img/lightning-rainy-night.jpg';
import lightningConditionImage from './img/lightning.jpg';
import lightningNightConditionImage from './img/lightning-night.jpg';
import rainyConditionImage from './img/rainy.jpg';
import rainyNightConditionImage from './img/rainy-night.jpg';
import snowyRainyConditionImage from './img/snowy-rainy.jpg';
import snowyRainyNightConditionImage from './img/snowy-rainy-night.jpg';
import snowyConditionImage from './img/snowy.jpg';
import snowyNightConditionImage from './img/snowy-night.jpg';
import windyVariantConditionImage from './img/windy-variant.jpg';
import windyVariantNightConditionImage from './img/windy-variant-night.jpg';
import windyConditionImage from './img/windy.jpg';
import windyNightConditionImage from './img/windy-night.jpg';

interface WeatherImageVariants {
  day: string;
  night: string;
}

export const WeatherImages: Record<string, WeatherImageVariants> = {
  pouring: { day: pouringConditionImage, night: pouringNightConditionImage },
  sunny: { day: sunnyConditionImage, night: clearNightConditionImage },
  clearnight: { day: sunnyConditionImage, night: clearNightConditionImage },
  partlycloudy: { day: partlyCloudyConditionImage, night: partlyCloudyNightConditionImage },
  fog: { day: fogConditionImage, night: fogNightConditionImage },
  hail: { day: hailConditionImage, night: hailNightConditionImage },
  lightningrainy: { day: lightningRainyConditionImage, night: lightningRainyNightConditionImage },
  lightning: { day: lightningConditionImage, night: lightningNightConditionImage },
  rainy: { day: rainyConditionImage, night: rainyNightConditionImage },
  snowyrainy: { day: snowyRainyConditionImage, night: snowyRainyNightConditionImage },
  snowy: { day: snowyConditionImage, night: snowyNightConditionImage },
  windyvariant: { day: windyVariantConditionImage, night: windyVariantNightConditionImage },
  windy: { day: windyConditionImage, night: windyNightConditionImage },
};

export const DEFAULT_WEATHER_IMAGE = WeatherImages.partlycloudy;
