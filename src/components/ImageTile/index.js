import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import PropTypes from 'prop-types';

import localStyles from './styles';

const ImageTile = ({uri, style, imageStyle, onPress}) => (
  <TouchableOpacity style={[localStyles.imageButton, style]} onPress={onPress}>
    <Image style={[localStyles.imageButton, imageStyle]} source={{uri}} />
  </TouchableOpacity>
);

ImageTile.propTypes = {
  uri: PropTypes.string,
  style: PropTypes.object,
  imageStyle: PropTypes.object,
  onPress: PropTypes.func,
};

ImageTile.defaultProps = {
  uri: '',
  style: {},
  imageStyle: {},
  onPress: () => {},
};

export default ImageTile;
