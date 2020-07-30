import React from 'react';
import {View} from 'react-native';
import localStyles from './styles';

let key = 0;

const RenderDots = new Array(10)
  .fill({i: 0})
  .map((item) => <View key={key++} style={localStyles.dot} />);

const DummyView = () => (
  <View style={localStyles.bottomDots}>{RenderDots}</View>
);

export default DummyView;
