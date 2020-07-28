import {StyleSheet} from 'react-native';

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
    marginLeft: 16,
  },
});

export default styles;
