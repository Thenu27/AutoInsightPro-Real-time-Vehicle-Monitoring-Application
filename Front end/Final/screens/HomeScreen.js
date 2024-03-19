import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';

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
      <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('PeformanceAnalyzer')}>
        <Text style={styles.buttonText}>Peformance Analyzer</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('VehicleMonitoring')}>
        <Text style={styles.buttonText}>Vehicle Monitoring</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.buttonStyle} onPress={() => navigation.navigate('Fuel Efficiency Tracker')}>
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

export default HomeScreen