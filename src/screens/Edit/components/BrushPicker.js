import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {darkCharcoal} from '../../../themes/colors';

import ColorPicker from '../../../components/DrawingTools/ColorPicker';
import StrokePicker from '../../../components/DrawingTools/StrokePicker';
import localStyles from './styles';

const BrushPicker = ({
  selectedColor,
  selectedStroke,
  onChangeColor,
  onChangeStroke,
  onPressMore,
  onBrushPickerToggle,
}) => {
  return (
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
      <TouchableOpacity
        onPress={() => onBrushPickerToggle({toggle: false})}
        style={localStyles.moreButton}>
        <Icon
          style={localStyles.moreIcon}
          size={20}
          color={darkCharcoal}
          name="caret-back-outline"
        />
      </TouchableOpacity>
    </View>
  );
};

BrushPicker.propTypes = {
  selectedColor: PropTypes.string,
  selectedStroke: PropTypes.number,
  onChangeColor: PropTypes.func,
  onChangeStroke: PropTypes.func,
  onPressMore: PropTypes.func,
  onBrushPickerToggle: PropTypes.func,
};

BrushPicker.defaultProps = {};

export default BrushPicker;
