import React from 'react';
import PropTypes from 'prop-types';

import CustomSlider from './Slider';
import LightnessShade from '../Shades/LightnessShade';
import {getColorFromHSL} from '../../../../utils/colorUtils';

const LightnessSlider = ({color, value, onValueChange, style}) => (
  <CustomSlider
    style={style}
    value={value}
    shade={<LightnessShade color={color} />}
    maximumValue={1}
    step={0.01}
    onValueChange={onValueChange}
    thumbTintColor={getColorFromHSL({...color, l: value})}
  />
);

LightnessSlider.propTypes = {
  color: PropTypes.object,
  value: PropTypes.number,
  onValueChange: PropTypes.func,
  style: PropTypes.object,
};

export default LightnessSlider;
