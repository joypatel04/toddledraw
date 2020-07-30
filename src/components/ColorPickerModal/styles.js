import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  colorPickerModal: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  colorPickerView: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  colorPicker: {
    width: '90%',
    height: '60%',
  },
  doneContainer: {
    width: '100%',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  doneButton: {
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneText: {
    color: '#333',
    fontWeight: '500',
    fontSize: 14,
    fontFamily: 'Heiti SC',
  },
  usedColorsContainer: {
    width: '92%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginBottom: 10,
  },
  usedColorsText: {
    color: '#333',
    fontWeight: '500',
    fontSize: 20,
    fontFamily: 'Heiti SC',
  },
  usedColors: {
    marginTop: 10,
    width: '100%',
    height: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  usedColorBtn: {
    margin: 8,
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
