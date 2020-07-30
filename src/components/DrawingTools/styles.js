import {StyleSheet} from 'react-native';
import {greyShadow} from '../../themes/colors';

const resuableStyles = {
  tool: {
    position: 'absolute',
    width: 30,
    height: 90,
    bottom: -60,
  },
  pickerButton: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerButtonView: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  picker: {
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
  },
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 90,
  },
  penButton: {
    marginRight: 20,
  },
  penView: {
    marginRight: 30,
    shadowColor: greyShadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 1,
    shadowOpacity: 1,
    elevation: 4,
  },
  eraseButton: {
    marginLeft: 20,
  },
  eraserView: {
    marginRight: 30,
    shadowColor: greyShadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 3,
    shadowOpacity: 1,
    elevation: 4,
  },
  penIcon: {
    ...resuableStyles.tool,
  },
  penTipIcon: {
    ...resuableStyles.tool,
    width: 35,
    left: -2,
  },
  eraserIcon: {
    ...resuableStyles.tool,
  },
  colorPickerButton: {
    ...resuableStyles.pickerButton,
  },
  pickerButtonView: {
    ...resuableStyles.pickerButtonView,
  },
  colorPicker: {
    ...resuableStyles.picker,
  },
  strokePickerButton: {
    ...resuableStyles.pickerButton,
    marginTop: 8,
  },
  strokeButtonView: {
    ...resuableStyles.pickerButtonView,
  },
  strokePicker: {
    ...resuableStyles.picker,
    width: 22,
    height: 22,
    borderRadius: 22 / 2,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
