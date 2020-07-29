import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const StrokePicker = ({onChangeStoke, selectedStroke, selectedColor}) => {
  const onPressColorPicker = () => {};
  const strokeSize = {
    width: selectedStroke,
    height: selectedStroke,
    borderRadius: selectedStroke / 2,
    backgroundColor: selectedColor,
  };
  const borderColor = {
    borderColor: selectedColor,
    left: -6,
  };
  return (
    <>
      <TouchableOpacity
        style={[styles.strokePickerButton]}
        onPress={onPressColorPicker}>
        <View style={[styles.strokeButtonView]}>
          <View style={[styles.strokePicker, borderColor]}>
            <View style={[strokeSize]} />
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

StrokePicker.propTypes = {
  selectedColor: PropTypes.string,
  onChangeColor: PropTypes.func,
};

StrokePicker.defaultProps = {
  onChangeColor: () => {},
};

export default StrokePicker;
