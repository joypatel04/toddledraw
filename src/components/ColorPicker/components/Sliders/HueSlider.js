import React from 'react';
import PropTypes from 'prop-types';

import CustomSlider from './Slider';
import HueShade from '../Shades/HueShade';
import {getColorShadeFromHSL} from '../../../../utils/colorUtils';

const HueSlider = ({value, onValueChange, thumbTintColor}) => (
  <CustomSlider
    value={value}
    shade={<HueShade />}
    maximumValue={360}
    step={1}
    onValueChange={onValueChange}
    thumbTintColor={getColorShadeFromHSL(value)}
  />
);

HueSlider.propTypes = {
  value: PropTypes.number,
  onValueChange: PropTypes.func,
};

export default HueSlider;
