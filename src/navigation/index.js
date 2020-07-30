import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import Home from '../screens/Home';
import Edit from '../screens/Edit';
const Stack = createStackNavigator();

function Navigation() {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'transparent'},
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({current: {progress}}) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 0.5, 0.9, 1],
              outputRange: [0, 0.25, 0.7, 1],
            }),
          },
          overlayStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.5],
              extrapolate: 'clamp',
            }),
          },
        }),
      }}
      mode="modal">
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Edit" component={Edit} />
    </Stack.Navigator>
  );
}

export default Navigation;
