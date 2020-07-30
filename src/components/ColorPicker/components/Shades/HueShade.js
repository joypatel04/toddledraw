import React from 'react';
import Shade from './Shade';

import {getColorShadeFromHSL} from '../../../../utils/colorUtils';

const shadeStep = 40;
const maximumHueValue = 360;

const HueShade = () => {
  const getShadeColor = (i) => {
    return getColorShadeFromHSL(i);
  };

  return (
    <Shade
      getShadeColor={getShadeColor}
      shadeStep={shadeStep}
      maximumValue={maximumHueValue}
    />
  );
};

export default HueShade;
