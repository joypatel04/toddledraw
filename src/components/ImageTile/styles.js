import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  imageButton: {
    width: wp('30%'),
    height: wp('30%'),
    borderRadius: 12,
    marginBottom: wp('2%'),
  },
});

export default styles;
