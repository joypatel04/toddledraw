import React, {useState} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

import HueSlider from './components/Sliders/HueSlider';
import SaturationSlider from './components/Sliders/SaturationSlider';
import LightbnessSlider from './components/Sliders/LightnessSlider';
import {
  getColorShadeFromHexToHsl,
  getColorShadeFromHslToHex,
} from '../../utils/colorUtils';
import localStyles from './styles';
import {primaryColor} from '../../themes/colors';

const ColorPicker = ({defaultColor, onColorChange}) => {
  const [color, setColor] = useState(getColorShadeFromHexToHsl(defaultColor));
  const backgroundColor = {
    backgroundColor: getColorShadeFromHslToHex(color),
  };
  return (
    <View style={localStyles.container}>
      <View style={[localStyles.colorContainer, backgroundColor]} />
      <View style={localStyles.sliderContainer}>
        <HueSlider
          value={color.h}
          onValueChange={(h) => {
            console.log('h', h);
            setColor({...color, h});
            onColorChange({...color, h});
          }}
        />
      </View>
      <View style={localStyles.sliderContainer}>
        <SaturationSlider
          color={color}
          value={color.l}
          onValueChange={(l) => {
            console.log('l', l);
            setColor({...color, l});
            onColorChange({...color, l});
          }}
        />
      </View>
      <View style={localStyles.sliderContainer}>
        <LightbnessSlider
          color={color}
          value={color.s}
          onValueChange={(s) => {
            console.log('s', s);
            setColor({...color, s});
            onColorChange({...color, s});
          }}
        />
      </View>
    </View>
  );
};

ColorPicker.propTypes = {
  defaultColor: PropTypes.string,
};

ColorPicker.defaultProps = {
  defaultColor: primaryColor,
};

export default ColorPicker;
