import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {darkerGray} from '../../themes/colors';

import styles from './styles';

const ColorPicker = ({onChangeColor, selectedColor}) => {
  const onPressColorPicker = () => {
    onChangeColor();
  };
  const backgroundColor = {
    backgroundColor: selectedColor,
  };
  return (
    <>
      <TouchableOpacity
        style={[styles.colorPickerButton]}
        onPress={onPressColorPicker}>
        <View style={styles.pickerButtonView}>
          <View style={[styles.colorPicker, backgroundColor]} />
          <Icon size={12} color={darkerGray} name="caret-forward" />
        </View>
      </TouchableOpacity>
    </>
  );
};

ColorPicker.propTypes = {
  selectedColor: PropTypes.string,
  onChangeColor: PropTypes.func,
};

ColorPicker.defaultProps = {
  onChangeColor: () => {},
};

export default ColorPicker;
