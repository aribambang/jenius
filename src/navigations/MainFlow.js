import React from 'react';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import ContactsScreen from '../screens/ContactsScreen';
import ContactDetailScreen from '../screens/ContactDetailScreen';
import ContactEditScreen from '../screens/ContactEditScreen';
import ContactCreateScreen from '../screens/ContactCreateScreen';

const MainFlow = () => {
  const MainStack = createStackNavigator();

  return (
    <MainStack.Navigator initialRouteName='Contacts'>
      <MainStack.Screen
        name='Contacts'
        component={ContactsScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name='ContactCreate'
        component={ContactCreateScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name='ContactEdit'
        component={ContactEditScreen}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name='ContactDetail'
        component={ContactDetailScreen}
        options={{ headerShown: false }}
      />
    </MainStack.Navigator>
  );
};

export default MainFlow;
