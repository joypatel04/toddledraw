import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import PropTypes from 'prop-types';

import {pen1, pen2} from '../../assets';

import styles from './styles';

const Pen = ({onPress, selectedColor, isActive}) => {
  const tintColorStyle = {
    tintColor: selectedColor,
  };
  return (
    <TouchableOpacity
      disabled={isActive}
      onPress={onPress}
      hitSlop={{
        top: 5,
        left: 5,
        bottom: 5,
        right: 5,
      }}
      style={[styles.container, styles.penButton]}>
      <View style={styles.penView}>
        <Image source={pen1} style={styles.penIcon} />
        <Image source={pen2} style={[styles.penTipIcon, tintColorStyle]} />
      </View>
    </TouchableOpacity>
  );
};

Pen.propTypes = {
  onPress: PropTypes.func,
  selectedColor: PropTypes.string,
  isActive: PropTypes.bool,
};

Pen.defaultProps = {
  onPress: () => {},
  selectedColor: '#fff',
  isActive: false,
};

export default Pen;
