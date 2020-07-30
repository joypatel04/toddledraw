import React from 'react';
import {View, Text} from 'react-native';
import ViewPager from '@react-native-community/viewpager';

import {sliderData} from './sliderData';
import localStyles from './styles';

const Sliders = sliderData.map((item) => (
  <View key={item.id} style={localStyles.container}>
    <Text style={localStyles.text}>{`"${item.text}"`}</Text>
  </View>
));

const IntroSlider = () => (
  <ViewPager style={localStyles.container}>{Sliders}</ViewPager>
);

export default IntroSlider;
