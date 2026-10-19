# Weather Forecast Extended

A Home Assistant dashboard card presenting current weather and forecasts.

## Language

**Weather condition**:
The description of the weather at an observation or forecast time, such as sunny, clear night, or cloudy.

**Day/night context**:
Whether the current observation or an individual forecast time belongs to daytime or nighttime at the weather location.

**Header condition**:
The localized description of the current weather shown beside the temperature in the header.

**Forecast icon**:
The visual representation of the weather condition for a forecast period. Hourly forecast icons describe the weather at the respective forecast time.

**Header image**:
The optional background artwork behind the current weather condition, temperature, and header chips.
_Avoid_: Header icon

**Header image source**:
The origin of the header image: Included images or an Image entity.

**Included images**:
The weather-specific day and night artwork supplied with the card, shown as "Included" in the editor.
_Avoid_: Default images

**Image entity**:
A Home Assistant image entity selected to supply the header image.

**Header text color**:
The shared foreground color of header text and chip icons, including the nowcast time labels.
