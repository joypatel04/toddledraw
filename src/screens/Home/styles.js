import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {greyShadow} from '../../themes/colors';

const styles = StyleSheet.create({
  innerTopContainer: {
    top: -10,
    width: '100%',
    height: hp('40%'),
    transform: [{scale: 1}],
  },
  innerBottomContainer: {
    height: hp('60%'),
  },
  imageButton: {
    width: wp('30%'),
    height: wp('30%'),
    borderRadius: 12,
    marginBottom: wp('2%'),
  },
  banner: {
    height: '100%',
    width: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: greyShadow,
  },
});

export default styles;
