import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {darkCharcoal} from '../../../../themes/colors';

const styles = StyleSheet.create({
  shades: {
    width: wp('90%'),
    position: 'absolute',
  },
  sliderStyle: {
    width: wp('90%'),
    height: hp('5%'),
  },
  thumbStyle: {
    width: 10,
    height: wp('13%'),
    borderRadius: 24 / 2,
    shadowColor: darkCharcoal,
    shadowOffset: {width: 5, height: 10},
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 6,
    borderColor: darkCharcoal,
    borderWidth: 0.5,
  },
});

export default styles;
