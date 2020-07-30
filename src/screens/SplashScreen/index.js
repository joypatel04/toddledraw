import React, {useEffect} from 'react';
import {View, Image} from 'react-native';
import PropTypes from 'prop-types';

import styles from '../../themes/styles';
import localStyles from './styles';
import {splashscreen} from '../../assets';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={splashscreen}
        style={[styles.container, localStyles.image]}
      />
    </View>
  );
};

SplashScreen.propTypes = {
  navigation: PropTypes.object,
};

export default SplashScreen;
