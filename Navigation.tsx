/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import React from 'react';
import Home from './screens/Home';
import {Provider} from 'react-redux';
import store from './redux/store/store';

function Navigation(): React.JSX.Element {
  const Stack = createStackNavigator();

  const screenOptions = {
    headerShown: false,
  };
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default Navigation;
