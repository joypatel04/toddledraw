import {StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
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
    height: 50,
    backgroundColor: white,
    width: '100%',
    position: 'absolute',
    borderColor: lineColor,
    borderTopWidth: StyleSheet.hairlineWidth,
    zIndex: 1,
    bottom: 0,
    transform: [{translateY: 50}],
  },
  bgImage: {
    flexGrow: 1,
    width: '100%',
    height: '100%',
  },
  sideHeader: {
    width: 45,
    height: 'auto',
    backgroundColor: white,
    position: 'absolute',
    borderColor: lineColor,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    zIndex: 1,
    transform: [{translateX: -45}],
    top: hp('100%') / 2.6,
    borderRadius: 5,
  },
  sideHeaderPoint: {
    width: 20,
    height: 50,
    backgroundColor: white,
    position: 'absolute',
    borderColor: lineColor,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    top: hp('100%') / 2.6,
    borderRadius: 2,
    justifyContent: 'center',
    transform: [{translateX: -20}],
    alignItems: 'center',
  },
});

export default styles;
