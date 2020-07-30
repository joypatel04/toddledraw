import tinycolor from 'tinycolor2';

export const getColorShadeFromHSL = (hue) =>
  tinycolor({h: hue, s: 1, l: 0.5}).toHslString();

export const getColorFromHSL = (color) => tinycolor(color).toHslString();

export const getColorShadeFromHexToHsl = (hex) => tinycolor(hex).toHsl();

export const getColorShadeFromHslToHex = (hsl) => tinycolor(hsl).toHexString();
