import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    width: wp('90%'),
    height: hp('10%'),
  },
  sliderContainer: {
    marginTop: 30,
  },
});

export default styles;
