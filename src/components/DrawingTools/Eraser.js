import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import PropTypes from 'prop-types';

import {eraser} from '../../assets';
import styles from './styles';

const Eraser = ({onPress, isActive}) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={isActive}
    style={[styles.container, styles.eraseButton]}>
    <View style={styles.eraserView}>
      <Image source={eraser} style={styles.eraserIcon} />
    </View>
  </TouchableOpacity>
);

Eraser.propTypes = {
  onPress: PropTypes.func,
  isActive: PropTypes.bool,
};

Eraser.defaultProps = {
  onPress: () => {},
  isActive: false,
};

export default Eraser;
