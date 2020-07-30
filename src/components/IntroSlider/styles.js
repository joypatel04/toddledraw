import {StyleSheet} from 'react-native';
import {primaryFont} from '../../themes/fonts';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: primaryFont,
    fontSize: widthPercentageToDP('6%'),
    paddingHorizontal: 10,
    zIndex: 1,
  },
});

export default styles;
