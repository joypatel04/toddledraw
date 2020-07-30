import {StyleSheet} from 'react-native';
import {darkCharcoal, white, primaryColor} from '../../themes/colors';
import {primaryFont} from '../../themes/fonts';

const resuableStyles = {
  iconButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  modalView: {
    backgroundColor: white,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    paddingHorizontal: 22,
  },
  modalTitleText: {
    fontFamily: primaryFont,
    fontSize: 18,
    color: darkCharcoal,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalSubTitleText: {
    fontFamily: primaryFont,
    fontSize: 16,
    color: darkCharcoal,
    fontWeight: '600',
  },
  btnContainer: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveBtn: {
    ...resuableStyles.iconButton,
    marginRight: 25,
  },
  shareBtn: {
    ...resuableStyles.iconButton,
    marginLeft: 25,
  },
  iconText: {
    marginTop: 5,
    fontFamily: primaryFont,
    fontSize: 14,
    color: darkCharcoal,
    fontWeight: '500',
  },
  doneBtn: {
    marginTop: 5,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 40,
    backgroundColor: primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneText: {
    fontFamily: primaryFont,
    fontSize: 18,
    color: white,
    fontWeight: 'bold',
  },
});

export default styles;
