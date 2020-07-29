import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/dist/Ionicons';

import AnimatedComponent from '../../../components/AnimatedComponent';
import {darkCharcoal, lightCharcoal} from '../../../themes/colors';
import localStyles from './styles';

const Header = ({
  resizeMode,
  onDeletePress,
  onBackwardPress,
  onForwardPress,
  onDonePress,
  onFitToScreenPress,
  shouldDisabledBackward,
  shouldDisabledForward,
  childrenAnimation,
  onBrushPress,
  isActiveBrush,
}) => {
  const resizeIcon =
    resizeMode === 'slice' ? 'contract-outline' : 'expand-outline';
  const brushIcom = isActiveBrush ? 'brush' : 'brush-outline';

  return (
    <AnimatedComponent
      customStyle={localStyles.container}
      index={4}
      childrenAnimation={childrenAnimation}>
      <View style={localStyles.innerContainer}>
        <View style={localStyles.leftContainer}>
          <TouchableOpacity
            style={localStyles.deleteIconContainer}
            onPress={onDeletePress}>
            <Icon size={20} color={darkCharcoal} name="trash-outline" />
          </TouchableOpacity>
          <TouchableOpacity
            style={localStyles.zoomOutIconContainer}
            onPress={onFitToScreenPress}>
            <Icon size={20} color={darkCharcoal} name={resizeIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={localStyles.zoomOutIconContainer}
            onPress={onBrushPress}>
            <Icon size={18} color={darkCharcoal} name={brushIcom} />
          </TouchableOpacity>
        </View>
        <View style={localStyles.rightContainer}>
          {isActiveBrush && (
            <>
              <TouchableOpacity
                style={[localStyles.zoomOutIconContainer]}
                disabled={shouldDisabledBackward}
                onPress={onBackwardPress}>
                <Icon
                  size={20}
                  color={shouldDisabledBackward ? lightCharcoal : darkCharcoal}
                  name={'arrow-undo'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={[localStyles.zoomOutIconContainer]}
                disabled={shouldDisabledForward}
                onPress={onForwardPress}>
                <Icon
                  size={20}
                  color={shouldDisabledForward ? lightCharcoal : darkCharcoal}
                  name={'arrow-redo'}
                />
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity
            style={localStyles.textBtnContainer}
            onPress={onDonePress}>
            <Text style={localStyles.doneText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AnimatedComponent>
  );
};

Header.propTypes = {
  resizeMode: PropTypes.string,
  onDeletePress: PropTypes.func,
  onBackwardPress: PropTypes.func,
  onForwardPress: PropTypes.func,
  onDonePress: PropTypes.func,
  onFitToScreenPress: PropTypes.func,
  shouldDisabledForward: PropTypes.bool,
  shouldDisabledBackward: PropTypes.bool,
  childrenAnimation: PropTypes.object,
  onBrushPress: PropTypes.func,
};

Header.defaultProps = {
  resizeMode: 'cover',
  onDeletePress: () => {},
  onBackwardPress: () => {},
  onForwardPress: () => {},
  onDonePress: () => {},
  onFitToScreenPress: () => {},
  shouldDisabledForward: true,
  shouldDisabledBackward: true,
  onBrushPress: () => {},
};

export default Header;
