import React, {useState} from 'react';
import {View, Pressable} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const maxStrokeWidth = 20;
const minStrokeWidth = 3;

const StrokePicker = ({onChangeStroke, selectedStroke, selectedColor}) => {
  const [strokeValue, setStrokeValue] = useState(selectedStroke);
  const [strokeStep, setStrokeStep] = useState('increment');

  const onPressStrock = () => {
    if (strokeValue + 1 >= maxStrokeWidth) {
      setStrokeStep('decrement');
    } else if (strokeValue - 1 <= minStrokeWidth) {
      setStrokeStep('increment');
    }
    if (strokeValue < maxStrokeWidth && strokeStep === 'increment') {
      setStrokeValue(strokeValue + 1);
      onChangeStroke(strokeValue + 1);
    } else {
      setStrokeValue(strokeValue - 1);
      onChangeStroke(strokeValue - 1);
    }
  };

  const strokeSize = {
    width: strokeValue,
    height: strokeValue,
    borderRadius: strokeValue / 2,
    backgroundColor: selectedColor,
  };
  const borderColor = {
    borderColor: selectedColor,
    left: -6,
  };
  return (
    <>
      <Pressable style={[styles.strokePickerButton]} onPress={onPressStrock}>
        <View style={[styles.strokeButtonView]}>
          <View style={[styles.strokePicker, borderColor]}>
            <View style={[strokeSize]} />
          </View>
        </View>
      </Pressable>
    </>
  );
};

StrokePicker.propTypes = {
  selectedColor: PropTypes.string,
  onChangeStroke: PropTypes.func,
};

StrokePicker.defaultProps = {
  onLongPress: () => {},
  onChangeStroke: () => {},
};

export default StrokePicker;
