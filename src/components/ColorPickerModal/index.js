import React from 'react';
import {View, Pressable, Text} from 'react-native';
import Modal from 'react-native-modal';
import isEmpty from 'lodash/isEmpty';
import {SafeAreaView} from 'react-native-safe-area-context';
import PropTypes from 'prop-types';

import ColorPicker from '../ColorPicker';
import {white} from '../../themes/colors';
import {getColorShadeFromHslToHex} from '../../utils/colorUtils';
import localStyles from './styles';

const ColorPickerModal = ({
  showColorPicker,
  selectedColor,
  onColorChange,
  onCloseModal,
  usedColors,
  onPressRecentColor,
}) => {
  const AllColors = usedColors.map((item) => {
    const backgroundColor = {
      backgroundColor: item,
    };
    return (
      <Pressable
        key={item}
        onPress={() => onPressRecentColor(item)}
        style={[localStyles.usedColorBtn, backgroundColor]}>
        <View style={[localStyles.usedColorBtn, backgroundColor]} />
      </Pressable>
    );
  });

  return (
    <Modal
      coverScreen
      style={localStyles.colorPickerModal}
      animationIn="fadeIn"
      animationOut="fadeOut"
      backgroundColor={white}
      isVisible={showColorPicker}>
      <SafeAreaView style={localStyles.colorPickerView}>
        <View style={localStyles.doneContainer}>
          <Pressable
            style={localStyles.doneButton}
            onPress={() => {
              if (!isEmpty(usedColors)) {
                onColorChange(usedColors[0]);
              }
              onCloseModal();
            }}>
            <Text>Cancel</Text>
          </Pressable>
          <Pressable
            style={localStyles.doneButton}
            onPress={() => onCloseModal()}>
            <Text>Done</Text>
          </Pressable>
        </View>
        <ColorPicker
          defaultColor={selectedColor}
          onColorChange={(color) => {
            onColorChange(getColorShadeFromHslToHex(color));
          }}
        />
        <View style={localStyles.usedColorsContainer}>
          {!isEmpty(usedColors) && (
            <Text style={localStyles.usedColorsText}>Recently used</Text>
          )}
          <View style={localStyles.usedColors}>{AllColors}</View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

ColorPickerModal.propTypes = {
  showColorPicker: PropTypes.bool,
  selectedColor: PropTypes.string,
  onColorChange: PropTypes.func,
  onCloseModal: PropTypes.func,
  usedColors: PropTypes.array,
  allColors: PropTypes.any,
};

export default ColorPickerModal;
