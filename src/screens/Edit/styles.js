import {StyleSheet} from 'react-native';
import {white, lineColor} from '../../themes/colors';

const styles = StyleSheet.create({
  topHeader: {
    height: 45,
    backgroundColor: white,
    width: '100%',
    position: 'absolute',
    borderColor: lineColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    zIndex: 1,
    top: 0,
  },
  bottomHeader: {
    height: 45,
    backgroundColor: white,
    width: '100%',
    position: 'absolute',
    borderColor: lineColor,
    borderTopWidth: StyleSheet.hairlineWidth,
    zIndex: 1,
    bottom: 0,
  },
  bgImage: {
    flexGrow: 1,
    width: '100%',
    height: '100%',
  },
});

export default styles;
