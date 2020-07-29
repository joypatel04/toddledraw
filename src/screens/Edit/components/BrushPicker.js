import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {darkCharcoal} from '../../../themes/colors';

import AnimatedComponent from '../../../components/AnimatedComponent';
import ColorPicker from '../../../components/DrawingTools/ColorPicker';
import StrokePicker from '../../../components/DrawingTools/StrokePicker';
import localStyles from './styles';

const BrushPicker = ({
  childrenAnimation,
  selectedColor,
  selectedStroke,
  onChangeColor,
  onChangeStroke,
  onPressMore,
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
          onChangeStroke={onChangeStroke}
        />
        <TouchableOpacity onPress={onPressMore} style={localStyles.moreButton}>
          <Icon
            style={localStyles.moreIcon}
            size={20}
            color={darkCharcoal}
            name="apps-outline"
          />
        </TouchableOpacity>
      </View>
    </AnimatedComponent>
  );
};

BrushPicker.propTypes = {
  childrenAnimation: PropTypes.any,
  selectedColor: PropTypes.string,
  selectedStroke: PropTypes.number,
  onChangeColor: PropTypes.func,
  onChangeStroke: PropTypes.func,
  onPressMore: PropTypes.func,
};

BrushPicker.defaultProps = {};

export default BrushPicker;
