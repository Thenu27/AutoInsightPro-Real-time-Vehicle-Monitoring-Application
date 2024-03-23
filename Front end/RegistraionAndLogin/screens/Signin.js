import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native'; 
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = ({ navigation }) => {
  const [VehicleSave, setVehicles] = useState([]);
  const [error, setError] = useState(null); // State to store network request error
  const [ModalVisible, setModalVisible] = useState(false); // State for modal visibility

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

  const handleDelete = (vehicleNum, index) => {
    fetch(`http://192.168.1.13:8080/vehicle/delete/${vehicleNum}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete vehicle, Please try again ');
      }
      // If deletion is successful, update the state to reflect the deletion
      const updatedVehicles = [...VehicleSave];
      updatedVehicles.splice(index, 1);
      setVehicles(updatedVehicles);
      setModalVisible(true); // Show success modal
    })
    .catch(error => {
      console.error('Error deleting vehicle:', error);
      setError('Failed to delete vehicle');
    });
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



                <TouchableOpacity  style={styles.inputBox}  >
                        
                        <TextInput   
                        style={styles.inputBox2}
                          value={`Vehicle Number: ${vehicle.vehicleNum}`}
                          editable={false}
                        />

                </TouchableOpacity>



                  <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(vehicle.vehicleNum, index)}>
                    <Icon name="trash" size={20} color='#3AB0FF' />
                  </TouchableOpacity>


                </View>
              ))
            )}
          </View>
        </ScrollView>
        <Text style={styles.normalText}>If you don't have an account</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={() => navigation.navigate("Register")}>Register</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
      {/* Modal for success message */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText2}>Deleted!</Text>
            <Text style={styles.modelnrrText}>The vehicle details deleted successfully</Text>
            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    height: '90%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 160,
    borderTopLeftRadius: 160,
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
    width:270,
    
  },
  inputBox: {
    flex: 1,
    height: 45,    
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 100,
   color: '#ffffff',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',   
    marginVertical: 10,
    
  },

  inputBox2: {
    flex: 1,
    height: 45, 
    borderRadius: 100,
   color: '#ffffff',
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

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "#272829",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    width:"85%",
    shadowColor: "#000",
    borderColor: '#ffffff',
      borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  openButton: {
   // backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    //elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    color: "white",
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold"   
  },
  
  modalText2: {
    color: '#3AB0FF',
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
   },
  
   modelnrrText: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 20,
    fontSize:13,
  },

});

export default Login;
