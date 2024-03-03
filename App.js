import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VehicleHealthReport from './HealthReport';
import PerformanceAnalyzer from './PeformanceAnalyzer'; 
import VehicleMonitoring from './.vscode/VehicleMonitoring';
import Settings from './Settings';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {

  const handlePress = () => {
    console.log("Button pressed");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>AUTOINSIGHT PRO</Text>
      <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('HealthReport')}>
        <Text style={styles.buttonText}>Health Report</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('PerformanceAnalyzer')}>
        <Text style={styles.buttonText}>Performance Analyzer</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('VehicleMonitoring')}>
        <Text style={styles.buttonText}>Vehicle Monitoring</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.buttonStyle} onPress={handlePress}>
        <Text style={styles.buttonText}>Fuel Efficiency Tracker</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonStyle} onPress={handlePress}>
        <Text style={styles.buttonText}>Vehicle Maintenance Schedule</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonStyle} onPress={handlePress}>
        <Text style={styles.buttonText}>Collaborative Platform</Text>
      </TouchableOpacity>
      
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Welcome',
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={{ marginRight: 10 }}>
                <Text style={{ color: 'black' }}>Settings</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen name="HealthReport" component={VehicleHealthReport} options={{ title: 'Vehicle Health Report' }} />
        <Stack.Screen name="PerformanceAnalyzer" component={PerformanceAnalyzer} options={{ title: 'Performance Analyzer' }} />
        <Stack.Screen name="VehicleMonitoring" component={VehicleMonitoring} options={{ title: 'Vehicle Monitoring' }} />
        <Stack.Screen name="Settings" component={Settings} options={{ title: 'Settings' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  textStyle: {
    fontSize: 40,
    color: 'white',
    fontFamily: "Times New Roman",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  buttonStyle: {
    marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: 'blue',
    borderRadius: 25,
  },
});
