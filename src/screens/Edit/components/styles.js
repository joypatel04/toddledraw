import {StyleSheet} from 'react-native';
import {primaryFont} from '../../../themes/fonts';
import {greyShadow} from '../../../themes/colors';

const resuableStyle = {
  iconContainer: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  innerContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftContainer: {
    flex: 0.5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  rightContainer: {
    flex: 0.5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  deleteIconContainer: {
    ...resuableStyle.iconContainer,
  },
  zoomOutIconContainer: {
    ...resuableStyle.iconContainer,
    marginLeft: 16,
  },
  textBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneText: {
    color: '#333',
    fontWeight: '500',
    fontSize: 14,
    marginLeft: 15,
    fontFamily: primaryFont,
  },
  bottomContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideContainer: {
    justifyContent: 'space-around',
    flexDirection: 'column',
    paddingLeft: 5,
    paddingVertical: 8,
  },
  moreButton: {
    marginTop: 8,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreIcon: {
    left: -6,
  },
  bottomDots: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 5,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  dot: {
    backgroundColor: greyShadow,
    width: 5,
    height: 5,
    borderRadius: 5 / 2,
    marginLeft: 46,
  },
});

export default styles;
