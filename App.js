import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch, Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApplicationProvider, IconRegistry, Layout, Spinner } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import store from './src/store/index';

import { MaterialCommunityIconsPack } from './src/components/icons/MaterialCommunityIcons';
import MainFlow from './src/navigations/MainFlow';
import { default as customTheme } from './theme.json';

export default function App() {
  const Stack = createStackNavigator();
  const [theme, setTheme] = useState('light');
  return (
    <Provider store={store}>
      <IconRegistry icons={[EvaIconsPack, MaterialCommunityIconsPack]} />
      <ApplicationProvider {...eva} theme={{ ...eva[theme], ...customTheme }}>
        <NavigationContainer>
          <Stack.Navigator headerMode='none'>
            <Stack.Screen name='mainFlow' component={MainFlow} />
          </Stack.Navigator>
          <StatusBar style={'dark'} />
        </NavigationContainer>
      </ApplicationProvider>
    </Provider>
  );
}
