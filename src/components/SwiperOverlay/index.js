import React, {useRef, useState, useEffect} from 'react';
import {View} from 'react-native';
import idx from 'idx';
import ViewPager from '@react-native-community/viewpager';
import * as Animatable from 'react-native-animatable';
import PropTypes from 'prop-types';

import {swiperData} from './swiperData';
import localStyles from './styles';

const SwiperOverlay = ({pointerEvents, isActiveFilter}) => {
  const label = useRef();
  const [pageNumber, setPageNumber] = useState(null);

  useEffect(() => {
    if (label && label.current) {
      label.current.fadeOut();
    }
  }, []);
  const Swipers = swiperData.map((item) => {
    const backgoundColor = {
      backgroundColor: item.overlayColor,
    };

    return (
      <View key={item.id} style={[localStyles.container, backgoundColor]} />
    );
  });

  const zIndex = {
    zIndex: isActiveFilter ? 1 : 0,
  };

  return (
    <View pointerEvents={pointerEvents} style={[localStyles.container, zIndex]}>
      <ViewPager
        onPageSelected={(evt) => {
          if (evt) {
            console.log(evt.nativeEvent.position);
            const {position} = idx(evt, (_) => _.nativeEvent) || null;
            if (position === 0) {
              setPageNumber(null);
            } else {
              setPageNumber(position);
            }
          }

          if (label && label.current) {
            label.current.fadeIn('500');
            setTimeout(() => {
              label.current.fadeOut('500');
            }, 500);
          }
        }}
        style={[localStyles.container]}>
        {Swipers}
      </ViewPager>
      <Animatable.Text
        pointerEvents="none"
        useNativeDriver
        ref={label}
        easing="ease-out"
        style={[localStyles.textColor]}>
        {pageNumber && swiperData[pageNumber].name}
      </Animatable.Text>
    </View>
  );
};

SwiperOverlay.propTypes = {
  pointerEvents: PropTypes.string,
};

export default SwiperOverlay;
