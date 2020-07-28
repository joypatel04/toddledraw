import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Navigation from './navigation';

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Navigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
