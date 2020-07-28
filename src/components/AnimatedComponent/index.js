import * as Animatable from 'react-native-animatable';
import React from 'react';
import PropTypes from 'prop-types';

const AnimatedComponent = ({
  isWrapper,
  index,
  parentAnimation,
  childrenAnimation,
  children,
  customStyle,
}) => {
  const animationDuration = isWrapper ? 400 : 500;
  const animationDelay = isWrapper ? 100 : 500 * (index / 2);
  const animation = isWrapper ? parentAnimation : childrenAnimation;

  return (
    <Animatable.View
      useNativeDriver
      easing={isWrapper ? 'ease-in-out' : 'ease-out'}
      animation={animation}
      duration={animationDuration}
      iterationDelay={animationDelay}
      style={customStyle}>
      {children}
    </Animatable.View>
  );
};

AnimatedComponent.propTypes = {
  children: PropTypes.objectOf(PropTypes.any),
  isWrapper: PropTypes.bool,
  index: PropTypes.number,
  parentAnimation: PropTypes.object,
  childrenAnimation: PropTypes.object,
  customStyle: PropTypes.any,
};
AnimatedComponent.defaultProps = {
  children: null,
  isWrapper: false,
  index: 1,
  parentAnimation: {},
  childrenAnimation: {},
  customStyle: {},
};

export default AnimatedComponent;
