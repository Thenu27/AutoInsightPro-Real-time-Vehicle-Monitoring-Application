import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native'; 
import Icon from 'react-native-vector-icons/FontAwesome';

const Login = ({ navigation }) => {
    const [ModalVisible, setModalVisible] = useState(false); // State for modal visibility
  return (
    <SafeAreaView style={styles.container2}>
      <View style={styles.container}>


      <Text style={styles.nrText}>
          PLEASE, READ THIS<Text style={styles.specialBlue} 
          > CAREFULLY!</Text>
        </Text>

<View style={styles.mainContainner}>
<View >
    
<Text style={styles.nrText2}>1)  You should <Text style={styles.specialRed} 
          > NOT</Text> use this mobile application when driving a vehicle.
        </Text>

        <Text style={styles.nrText2}>2)  Author is not resposible for any damage made to yourvphone,car etc.
        </Text>

        <Text style={styles.nrText2}>3)  If this application predicts that your vehicle is damaged or faulty, only qualified personnel should repair it.
        </Text>

        <Text style={styles.nrText2}>4)  This application is provided "<Text style={styles.specialRed} 
          > AS IS</Text> ".
        </Text>

        <Text style={styles.nrText2}>5)
        <Text style={styles.nrText}> AutoInsight  <Text style={styles.specialBlue}
          > Pro </Text></Text> <Text style={styles.nrText2}>doesn't collect any personnel related data.</Text>
        </Text>
        </View>
</View>




      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Register")}>
          <Text style={styles.buttonText}>Yes,I agree!</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.button}onPress={() => setModalVisible(true)} >
          <Text style={styles.buttonText}>No, I not agree! </Text>
         
        </TouchableOpacity>
        
        
       </View>
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
            <Text style={styles.modalText2}>Attention!</Text>
            <Text style={styles.modelnrrText}>Your agreement to the policies is required to continue </Text>
            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: "red" }}
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
    height: '85%',
    width: '90%',
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    padding: 20,
    
  },
  container2: {
    flex: 1,
    backgroundColor: '#272829',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewContent: {
    alignItems: 'center',
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
  specialBlue: {
    color: '#3AB0FF',
    
  },
  nrText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight:'bold',
    marginBottom: 10,
  },

  mainContainner: {
    width:"100%",      
    backgroundColor: 'transparent',
    borderColor: '#3AB0FF',
   alignItems: 'center',
    borderWidth: 1,   
    justifyContent: 'center',
    borderRadius: 20,
    padding:20,
    marginBottom:20,
    marginTop:20,
    textAlign:'center'
  },

  mainContainner2: {
    
    alignItems: 'center',
    borderWidth: 1,   
    justifyContent: 'center',
    borderRadius: 20,
    padding:10,
    marginBottom:20,
   // textAlign:'center'
  },
  specialRed: {
    color: 'red',
    
  },
  nrText2: {
    fontSize: 14,
    color: '#ffffff',
  //  fontWeight:'bold',
    marginBottom: 10,
    
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "#000000",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    width:"85%",
    shadowColor: "#000",
    borderColor: 'red',
      borderWidth: 2,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  openButton: { 
    borderRadius: 20,
    padding: 10,
   
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    color: "white",
   // marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold"   
  },
  
  modalText2: {
    color: 'red',
   // marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
   },
  
   modelnrrText: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 20,
    fontSize:13,
    textAlign:'center'
  },

});

export default Login;
