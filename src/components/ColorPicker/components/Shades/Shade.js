import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

import localStyles from './styles';

const Shade = ({shadeStep, maximumValue, getShadeColor}) => {
  const shadeValues = [];
  for (let i = 1; i <= shadeStep; i++) {
    const current = (i * maximumValue) / shadeStep;
    const backgroundColor = {
      backgroundColor: getShadeColor(current),
    };
    shadeValues.push(
      <View key={i} style={[localStyles.shade, backgroundColor]} />,
    );
  }

  return <View style={localStyles.container}>{shadeValues}</View>;
};

Shade.propTypes = {
  shadeStep: PropTypes.number,
  maximumValue: PropTypes.number,
  getShadeColor: PropTypes.func,
};

export default Shade;
