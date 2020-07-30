import {StyleSheet} from 'react-native';
import {red} from '../../themes/colors';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {primaryFont} from '../../themes/fonts';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  textColor: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: primaryFont,
    fontSize: widthPercentageToDP('20%'),
    backgroundColor: red,
    paddingHorizontal: 10,
  },
});

export default styles;
