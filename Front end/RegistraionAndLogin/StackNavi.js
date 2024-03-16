import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Register from'./screens/Register'
import Signin from './screens/Signin';


const Stack=createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
      <Stack.Screen name='Register' component={Register}/>
        <Stack.Screen name='Sign' component={Signin}/>
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}


