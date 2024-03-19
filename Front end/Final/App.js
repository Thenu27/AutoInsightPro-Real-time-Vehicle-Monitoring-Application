import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import FuelEFF from './screens/FuelEff';
import TipsScreen from './screens/Tips';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen 
        name='Home'
        component={HomeScreen}>
          </Stack.Screen>
        <Stack.Screen 
        name='Fuel Efficiency Tracker' 
        component={FuelEFF}
        options={{
          headerStyle: {
            backgroundColor: 'rgba(44, 179, 255, 1)',
          },
          headerTitleStyle: {
            color: 'white',
            fontSize: 20,
          },
          headerTintColor: 'white',
          headerTitle: 'Fuel Efficiency Tracker',
        }}
        />
          <Stack.Screen 
          name='Tips' 
          component={TipsScreen}
          options={{
            headerStyle: {
              backgroundColor: 'rgba(44, 179, 255, 1)',
            },
            headerTitleStyle: {
              color: 'white',
              fontSize: 20,
            },
            headerTintColor: 'white',
            headerTitle: 'Tips',
          }}
          />  
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//   function MyApp() {
//     const navigation = useNavigation(); // Hook from react-navigation
//     const RedirectTips = () => {
//       navigation.navigate('HomeScreen');
//       console.log("Tips box pressed")
//     } 
  

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <Text style={styles.text}>AutoInsight <Text style={styles.blueText}>Pro</Text></Text>
//         <View style={[styles.box, { width: 340}]}>
//           <Text style={[styles.text2,]}>Remaining Distance</Text>
//           <Text style={styles.text3}>___<Text style={styles.text2}> KM</Text></Text>
//         </View>
//         <View style={[styles.box, { height: 180, width: 340}]}>
//           <Text style={styles.text2}>Current Consumption</Text>
//           <Text style={styles.text3}>__<Text style={styles.text2}> KM/L</Text></Text>
//         </View>
//         <View style={[styles.box, { height: 280 }]}>
//           <Text style={styles.text2}>Potential Consumption</Text>
//           <Text style={[styles.text3, {marginTop: 0}]}>__<Text style={styles.text2}> KM/L</Text></Text>
//           <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
//           <View style={styles.innerBox}>
//             <Text style={styles.text2}>LEARN TIPS TO SAVE</Text>
//             <Text style={styles.text2}>MONEY {'>'}</Text>
//           </View>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//       <StatusBar style="auto" />
//     </SafeAreaView>
//   );
// }


