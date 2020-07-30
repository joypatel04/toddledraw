import {StyleSheet, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    width: wp('90%'),
    height: hp('5%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    borderRadius: 5,
    overflow: 'hidden',
  },
  shade: {
    flex: 1,
    marginLeft: Platform.OS === 'ios' ? -StyleSheet.hairlineWidth : 0,
  },
});

export default styles;
