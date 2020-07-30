import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  greyShadow,
  primaryColor,
  white,
  darkCharcoal,
} from '../../themes/colors';
import {primaryFont} from '../../themes/fonts';

const resuableStyle = {
  text: {
    fontSize: 18,
    color: white,
    fontFamily: primaryFont,
    fontWeight: '500',
  },
  container: {
    height: hp('65%'),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const styles = StyleSheet.create({
  innerTopContainer: {
    top: -10,
    width: '100%',
    height: hp('35%'),
    transform: [{scale: 1}],
  },
  innerBottomContainer: {
    ...resuableStyle.container,
  },
  innerBottomPermissionContainer: {
    ...resuableStyle.container,
    padding: 45,
    justifyContent: 'flex-start',
    paddingTop: 100,
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
  contentText: {
    ...resuableStyle.text,
    color: darkCharcoal,
    textAlign: 'center',
    marginBottom: 10,
  },
  contentSubText: {
    ...resuableStyle.text,
    color: darkCharcoal,
    textAlign: 'center',
    marginBottom: 50,
    fontSize: 16,
  },
  button: {
    borderRadius: 16,
    backgroundColor: primaryColor,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    ...resuableStyle.text,
  },
});

export default styles;
