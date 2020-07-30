import {StyleSheet} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {white} from '../../themes/colors';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
    paddingTop: wp('10%'),
  },
  textInputBtn: {
    width: '100%',
    height: 'auto',
    minHeight: 50,
    padding: 16,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  textInput: {
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Heiti SC',
    textAlign: 'left',
    width: '100%',
    height: 'auto',
  },
  input: {
    backgroundColor: white,
  },
  textTools: {
    backgroundColor: white,
    width: '100%',
    height: 50,
  },
});

export default styles;
