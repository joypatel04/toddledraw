import React from 'react';
import {View, Pressable, Text} from 'react-native';
import {ColorPicker, fromHsv} from 'react-native-color-picker';
import Modal from 'react-native-modal';
import isEmpty from 'lodash/isEmpty';
import {SafeAreaView} from 'react-native-safe-area-context';
import PropTypes from 'prop-types';

import {white} from '../../themes/colors';
import localStyles from './styles';

const ColorPickerModal = ({
  showColorPicker,
  selectedColor,
  onColorChange,
  onCloseModal,
  usedColors,
  allColors,
}) => (
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
          onPress={() => onCloseModal()}>
          <Text>Done</Text>
        </Pressable>
      </View>
      <ColorPicker
        defaultColor={selectedColor}
        onColorChange={(color) => {
          onColorChange(fromHsv(color));
        }}
        style={localStyles.colorPicker}
      />
      <View style={localStyles.usedColorsContainer}>
        {!isEmpty(usedColors) && (
          <Text style={localStyles.usedColorsText}>Recently used</Text>
        )}
        <View style={localStyles.usedColors}>{allColors}</View>
      </View>
    </SafeAreaView>
  </Modal>
);

ColorPickerModal.propTypes = {
  showColorPicker: PropTypes.bool,
  selectedColor: PropTypes.string,
  onColorChange: PropTypes.func,
  onCloseModal: PropTypes.func,
  usedColors: PropTypes.array,
  allColors: PropTypes.any,
};

export default ColorPickerModal;
