import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

import Pen from '../../../components/DrawingTools/Pen';
import Eraser from '../../../components/DrawingTools/Eraser';
import AnimatedComponent from '../../../components/AnimatedComponent';
import localStyles from './styles';

const Footer = ({
  childrenAnimation,
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
    <AnimatedComponent
      customStyle={localStyles.bottomContainer}
      index={3}
      childrenAnimation={childrenAnimation}>
      <View style={[localStyles.bottomContainer]}>
        <AnimatedComponent
          index={1}
          childrenAnimation={penAnimation}
          duration={200}
          delayValue={0}>
          <Pen
            selectedColor={selectedColor}
            isActive={selectedTool === 'pen'}
            onPress={onPressPen}
          />
        </AnimatedComponent>
        <AnimatedComponent
          index={1}
          childrenAnimation={earserAnimation}
          duration={200}
          delayValue={0}>
          <Eraser
            isActive={selectedTool === 'eraser'}
            onPress={onPressEraser}
          />
        </AnimatedComponent>
      </View>
    </AnimatedComponent>
  );
};

Footer.propTypes = {
  childrenAnimation: PropTypes.object,
  selectedTool: PropTypes.any,
  onPressPen: PropTypes.func,
  onPressEraser: PropTypes.func,
};

Footer.defaultProps = {
  selectedTool: null,
  onPressPen: () => {},
  onPressEraser: () => {},
};

export default Footer;
