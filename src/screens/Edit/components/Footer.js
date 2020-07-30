import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

import Pen from '../../../components/DrawingTools/Pen';
import Eraser from '../../../components/DrawingTools/Eraser';
import AnimatedComponent from '../../../components/AnimatedComponent';
import localStyles from './styles';

const Footer = ({
  selectedTool,
  activeAnimation,
  deactiveAnimation,
  onPressPen,
  onPressEraser,
  selectedColor,
}) => {
  const [penAnimation, setPenAnimation] = useState(null);
  const [earserAnimation, setEarserAnimation] = useState(null);

  useEffect(() => {
    if (!selectedTool) {
      setEarserAnimation(null);
      setPenAnimation(null);
    }
    if (selectedTool === 'pen') {
      setPenAnimation(activeAnimation);
      setEarserAnimation(deactiveAnimation);
    } else if (selectedTool === 'eraser') {
      setEarserAnimation(activeAnimation);
      setPenAnimation(deactiveAnimation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTool]);
  return (
    <View style={[localStyles.bottomContainer]}>
      <AnimatedComponent index={1} childrenAnimation={penAnimation}>
        <Pen
          selectedColor={selectedColor}
          isActive={selectedTool === 'pen'}
          onPress={onPressPen}
        />
      </AnimatedComponent>
      <AnimatedComponent index={1} childrenAnimation={earserAnimation}>
        <Eraser isActive={selectedTool === 'eraser'} onPress={onPressEraser} />
      </AnimatedComponent>
    </View>
  );
};

Footer.propTypes = {
  selectedTool: PropTypes.any,
  onPressPen: PropTypes.func,
  onPressEraser: PropTypes.func,
  isActiveBrush: PropTypes.bool,
};

Footer.defaultProps = {
  selectedTool: null,
  onPressPen: () => {},
  onPressEraser: () => {},
  isActiveBrush: false,
};

export default Footer;
