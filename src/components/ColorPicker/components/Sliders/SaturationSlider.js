import React from 'react';
import PropTypes from 'prop-types';

import CustomSlider from './Slider';
import SaturationShade from '../Shades/SaturationShade';
import {getColorFromHSL} from '../../../../utils/colorUtils';

const SaturationSlider = ({color, value, onValueChange, style}) => (
  <CustomSlider
    style={style}
    value={value}
    shade={<SaturationShade color={color} />}
    maximumValue={1}
    step={0.01}
    onValueChange={onValueChange}
    thumbTintColor={getColorFromHSL({...color, s: value})}
  />
);

SaturationSlider.propTypes = {
  color: PropTypes.object,
  value: PropTypes.number,
  onValueChange: PropTypes.func,
  style: PropTypes.object,
};

export default SaturationSlider;
