import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import Slider from 'react-native-slider';

import localStyles from './styles';

const CustomSlider = ({
  value,
  step,
  maximumValue,
  shade,
  onValueChange,
  thumbTintColor,
}) => (
  <View>
    {shade}
    <View style={localStyles.shades}>
      <Slider
        style={localStyles.sliderStyle}
        value={value}
        step={step}
        maximumValue={maximumValue}
        onValueChange={onValueChange}
        thumbStyle={[localStyles.thumbStyle]}
        thumbTintColor={thumbTintColor}
        minimumTrackTintColor="transparent"
        maximumTrackTintColor="transparent"
      />
    </View>
  </View>
);

CustomSlider.propTypes = {
  value: PropTypes.number,
  step: PropTypes.number,
  maximumValue: PropTypes.number,
  shade: PropTypes.any,
  onValueChage: PropTypes.func,
  style: PropTypes.object,
  thumbTintColor: PropTypes.string,
};

export default CustomSlider;
