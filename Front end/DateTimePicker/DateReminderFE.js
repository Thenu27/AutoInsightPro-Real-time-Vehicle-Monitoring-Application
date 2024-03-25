import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Modal, KeyboardAvoidingView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function DateReminderFE() {
  const [licenseDate, setLicenseDate] = useState(null);
  const [licenseTime, setLicenseTime] = useState(null);
  const [insuranceDate, setInsuranceDate] = useState(null);
  const [insuranceTime, setInsuranceTime] = useState(null);
  const [showLicenseDatePicker, setShowLicenseDatePicker] = useState(false);
  const [showLicenseTimePicker, setShowLicenseTimePicker] = useState(false);
  const [showInsuranceDatePicker, setShowInsuranceDatePicker] = useState(false);
  const [showInsuranceTimePicker, setShowInsuranceTimePicker] = useState(false);

  const [licenseModalVisible, setLicenseModalVisible] = useState(false);
  const [insuranceModalVisible, setInsuranceModalVisible] = useState(false);

  const [ErrorModalVisible, setErrorModalVisible] = useState(false);
  

  const handleLicenseDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || licenseDate;
    setShowLicenseDatePicker(false);
    setLicenseDate(currentDate);
   
    
    
    
   
  };

  const handleLicenseTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || licenseTime;
    setShowLicenseTimePicker(false);
    setLicenseTime(currentTime);
    
  };

  const handleInsuranceDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || insuranceDate;
    setShowInsuranceDatePicker(false);
    setInsuranceDate(currentDate);
  };

  const handleInsuranceTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || insuranceTime;
    setShowInsuranceTimePicker(false);
    setInsuranceTime(currentTime);
  };

  const formatTime = (time) => {
    return `${time.getHours()}:${time.getMinutes() < 10 ? '0' : ''}${time.getMinutes()}`;
  };

 
  const setReminder = () => {

    if (!licenseDate || !licenseTime || !insuranceDate || !insuranceTime) {
      ( setErrorModalVisible(true));
      return;
    }
    // Calculate the time until license and insurance expiry
    const licenseDateTime = new Date(licenseDate.getFullYear(), licenseDate.getMonth(), licenseDate.getDate(), licenseTime.getHours(), licenseTime.getMinutes());
    const insuranceDateTime = new Date(insuranceDate.getFullYear(), insuranceDate.getMonth(), insuranceDate.getDate(), insuranceTime.getHours(), insuranceTime.getMinutes());
  
    const licenseTimeRemaining = licenseDateTime.getTime() - Date.now();
    const insuranceTimeRemaining = insuranceDateTime.getTime() - Date.now();
  
    // Show the license expiry modal
    if (licenseTimeRemaining <= 0) {
      setLicenseModalVisible(true);
    }
  
    // Show the insurance expiry modal
    if (insuranceTimeRemaining <= 0) {
      setInsuranceModalVisible(true);
    }
   
  };


//console.log("data",updateDatabase)
  const updateDatabase = (data) =>  {

    updateDatabase({
      licenseDate,
      licenseTime,
      insuranceDate,
      insuranceTime
    });

    console.log("data:",updateDatabase)
    

    // Send POST request to update the database
    fetch("http://192.168.1.13:8080/dateTime-save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update database');
      }
      return response.json();
    })
    .then(data => {
      console.log('Database updated successfully:', data);
      // Handle success response from the database
    })
    .catch(error => {
      console.error('Error updating database:', error);
      // Handle any errors
    });
 
  }
  return (
    <SafeAreaView style={styles.container}>
      
        <View style={styles.subView}>
        <Text style={styles.heading}>Expiry Date Reminder</Text>

        <View style={styles.container3}>
          <Text style={styles.nrrText}>
            Select <Text style={styles.specialBlue}>License Expiration Date and Time</Text>
          </Text>
          <TextInput
            style={styles.inputBox}
            placeholder='License Expiration Date'
            onFocus={() => setShowLicenseDatePicker(true)}
            value={licenseDate ? licenseDate.toLocaleDateString() : ''}
          />
          {showLicenseDatePicker && (
            <DateTimePicker
              mode='date'
              display='spinner'
              value={licenseDate || new Date()}
              onChange={handleLicenseDateChange}
              minimumDate={new Date()} // Disable selecting past dates
              
            />
          )}
          <TextInput
            style={styles.inputBox}
            placeholder='License Expiration Time'
            onFocus={() => setShowLicenseTimePicker(true)}
            value={licenseTime ? formatTime(licenseTime) : ''}
          />
          {showLicenseTimePicker && (
            <DateTimePicker
              mode='time'
              display='spinner'
              value={licenseTime || new Date()}
              onChange={handleLicenseTimeChange}
            />
          )}
        </View>

        <View style={styles.container4}>
          <Text style={styles.nrrText}>
            Select <Text style={styles.specialBlue}>Insurance Expiration Date and Time</Text>
          </Text>
          <TextInput
            style={styles.inputBox}
            placeholder='Insurance Expiration Date'
            onFocus={() => setShowInsuranceDatePicker(true)}
            value={insuranceDate ? insuranceDate.toLocaleDateString() : ''}
          />
          {showInsuranceDatePicker && (
            <DateTimePicker
              mode='date'
              display='spinner'
              value={insuranceDate || new Date()}
              onChange={handleInsuranceDateChange}
              minimumDate={new Date()} // Disable selecting past dates
            />
          )}
          <TextInput
            style={styles.inputBox}
            placeholder='Insurance Expiration Time'
            onFocus={() => setShowInsuranceTimePicker(true)}
            value={insuranceTime ? formatTime(insuranceTime) : ''}
          />
          {showInsuranceTimePicker && (
            <DateTimePicker
              mode='time'
              display='spinner'
              value={insuranceTime || new Date()}
              onChange={handleInsuranceTimeChange}
            />
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={setReminder}>
          <Text style={styles.buttonText}>Set Reminder</Text>
        </TouchableOpacity>




{/* License Modal */}
<Modal
          animationType="slide"
          transparent={true}
          visible={licenseModalVisible}
          onRequestClose={() => {
            setLicenseModalVisible(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              
              <Text style={styles.modalText2}>License Expiry Reminder</Text>              
              <Text style={styles.modelnrrText}> License Expiry Reminder : Your license is about to expire!</Text>
         
              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  setLicenseModalVisible(false);
                }}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>          
        </Modal>

        {/* Insurance Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={insuranceModalVisible}
          onRequestClose={() => {
            setInsuranceModalVisible(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
             
              <Text style={styles.modalText2}>Insurance Expiry Reminder</Text>              
              <Text style={styles.modelnrrText}> Insurance Expiry Reminder: Your insurance is about to expire!</Text>
                          
              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  setInsuranceModalVisible(false);
                }}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>          
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={ErrorModalVisible}
          onRequestClose={() => {
            setErrorModalVisible(false);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.EmodalView}>
             
              <Text style={styles.EmodalText2}>Attention</Text>              
              <Text style={styles.modelnrrText}> Please fill in all fields!</Text>
                          
              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: "red" }}
                onPress={() => {
                  setErrorModalVisible(false);
                }}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>          
        </Modal>




        <StatusBar style="auto" />
        
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <View style={styles.btn}>
            <Icon name="home" size={30} color="white" />
          </View>
        </TouchableOpacity>  


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272829',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container3: {
    width:"85%",
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderColor: '#3AB0FF',
    borderWidth: 1,
    marginBottom: 20,
  },
  container4: {
    width:"85%",
    flex: 1,
    backgroundColor: 'transparent',
    borderColor: '#3AB0FF',
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 20,
  },
  subView: {
    height: '85%',
    width: '90%',
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop:30,
  },
  heading: {
    paddingTop: 50,
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 26,
    paddingBottom: 10,
    marginBottom: 20,
  },
  inputBox: {
    width: 250,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: 16,
    color: '#ffffff',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    fontWeight: 'bold',
    marginVertical: 8,
    fontSize: 16,
    textAlign: 'center',
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
  nrrText: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
 
  btn: {
    backgroundColor: '#2CB3FF',
    marginTop: 10,
    marginBottom:10,
    borderRadius: 30,
    color: 'white',
    width: 60,
    height:60,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white'
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
    borderWidth: 3,
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
},

//sdfghjk

EmodalView: {
  margin: 20,
  backgroundColor: "#272829",
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
EmodalText2: {
  color: 'red',
  marginBottom: 15,
  textAlign: "center",
  fontWeight: "bold",
  fontSize: 18,
 },










});

