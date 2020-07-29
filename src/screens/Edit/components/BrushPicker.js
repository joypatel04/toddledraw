import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

import AnimatedComponent from '../../../components/AnimatedComponent';
import ColorPicker from '../../../components/DrawingTools/ColorPicker';
import StrokePicker from '../../../components/DrawingTools/StrokePicker';
import localStyles from './styles';

const BrushPicker = ({
  childrenAnimation,
  selectedColor,
  selectedStroke,
  onChangeColor,
  onChangeStoke,
}) => {
  return (
    <AnimatedComponent
      customStyle={[localStyles.bottomContainer, localStyles.sideContainer]}
      index={3}
      childrenAnimation={childrenAnimation}>
      <View style={[localStyles.bottomContainer, localStyles.sideContainer]}>
        <ColorPicker
          selectedColor={selectedColor}
          onChangeColor={onChangeColor}
        />
        <StrokePicker
          selectedStroke={selectedStroke}
          selectedColor={selectedColor}
          onChangeStoke={onChangeStoke}
        />
      </View>
    </AnimatedComponent>
  );
};

BrushPicker.propTypes = {};

BrushPicker.defaultProps = {};

export default BrushPicker;
