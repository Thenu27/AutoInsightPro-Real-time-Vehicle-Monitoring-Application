import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = ({ navigation }) => {
  const [VehicleSave, setVehicles] = useState([]);
  const [error, setError] = useState(null); // State to store network request error

  useEffect(() => {
    fetch("http://192.168.1.13:8080/vehicle/get-vehicles")
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(result => {
        setVehicles(result);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message); // Set error state if request fails
      });
  }, []);

  const handleDelete = (index) => {
    // Copy the vehicles array and remove the vehicle at the specified index
    const updatedVehicles = [...VehicleSave];
    updatedVehicles.splice(index, 1);
    setVehicles(updatedVehicles);
  };

  return (
    <SafeAreaView style={styles.container2}>
      <View style={styles.container}>
        <Text style={styles.mainText}>LOGIN</Text>
        
          <Text style={styles.nrText}> Select your <Text style={styles.specialBlue}>Account</Text></Text>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
         
          <View>
            {error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : (
              VehicleSave.map((vehicle, index) => (
                <View key={index} style={styles.inputContainer}>

                  <TextInput
                      style={styles.inputBox}
                      value={vehicle.vehicleNum ? vehicle.vehicleNum.toString() : ''}
                      editable={false}
                    />

                  
                  <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(index)}>
                    <Icon name="trash" size={20} color="red" />
                  </TouchableOpacity>
                </View>
              ))
            )}
         
           
          </View>
        </ScrollView>
        <Text style={styles.normalText}>If you don't have an account</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} 
          onPress={() => navigation.navigate("Register")}>Register</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    height: '80%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 150,
    borderTopLeftRadius: 150,
  },
  container2: {
    backgroundColor: '#272829',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '90%',
    justifyContent: 'center',
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width:200,
    
  },
  inputBox: {
    flex: 1,
    height: 45,    
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 100,
   color: '#ffffff',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    fontWeight: 'bold',
    marginVertical: 10,
    fontSize: 16,
    textAlign:"center"
  },
  mainText: {
    marginTop:20,
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 26,
    marginBottom: 20,
  },
  specialBlue: {
    color: '#3AB0FF',
  },
  nrText: {
    color: '#ffffff',
    marginBottom: 20,
  },
  button: {
    width: 250,
    backgroundColor: '#3AB0FF',
    borderRadius: 100,
    marginVertical: 16,
    paddingVertical: 10,
   
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  normalText: {
    marginTop:20,
    color: '#ffffff',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  deleteButton: {
    marginLeft: 10,
  },
});

export default Login;
