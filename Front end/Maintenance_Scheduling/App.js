import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Dimensions, StatusBar, Button, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import axios from 'axios';




export default function App() {
  const [serMileage, setMileage] = useState('');
  const parts = [
    // 'Changing Oil filter', 'Replacing Engine oil', 'Replacing Washer plug drain', 'Changing Dust and pollen filter',
    // 'Performing Wheel alignment', 'Replacing Air clean filter', 'Changing Fuel filter', 'Replacing Spark plugs',
    // 'Changing Brake fluid', 'Replacing Brake and clutch oil', 'Changing Transmission fluid',
    // 'Replacing Brake pads', 'Replacing Clutch', 'Changing Coolants'

    'Changing Oil filter', 'Changing Dust and pollen filter', 'Replacing Air clean filter', 'Changing Fuel filter', 'Replacing Spark plugs', 'Replacing Brake pads', 'Replacing Clutch',
    'Replacing Engine oil', 'Replacing Washer plug drain', 'Changing Brake fluid', 'Replacing Brake and clutch oil', 'Changing Transmission fluid', 'Changing Coolants',
    'Performing Wheel alignment'
    
  ];
  const [checkedItems, setCheckedItems] = useState(new Array(parts.length).fill(false));

  const sendDataToSpringboot = async (dataArray) => {
    try {
      const response = await axios.post('http://localhost:8080/vehicle/maintenance-details', dataArray, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  const [isViewVisible, setIsViewVisible] = useState(true);

  const handleSavePress = () =>{
    const checkedItemsTransfer = checkedItems.map(item => item ? 1: 0);
    console.log(checkedItemsTransfer);
    // sendDataToSpringboot(checkedItemsTransfer);
        fetch('http://192.168.7.35:8080/vehicle/maintenance-details', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkedItemsTransfer),
    })
    .then(response => response.text())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    currentMileage();
    setIsViewVisible(false);
  }

  const currentMileage = () => {
    const mileageData = [100000];
    mileageData.push(parseInt(serMileage, 10));

    fetch('http://192.168.7.35:8080/vehicle/current-Mileage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mileageData), 
    })
    .then(response => response.text())
    .then(data => console.log(data))  
    .catch(error => console.error('Error:', error)); 
  }
  

  return (
    <View style={styles.container}>
      <View style={styles.alwaysDisplay}>
      <TouchableOpacity  style={styles.serviceHistoryButton} activeOpacity={0.1} onPress={() => setIsViewVisible(true)} >
              <Text style={styles.saveButtonText}>SERVICE HISTORY</Text>
      </TouchableOpacity>
      {/* <Button title='service history' borderRadius={15}/> */}
      </View>

      <View style={styles.currentMileageBox}>
        <Text style={{fontSize: 25, marginLeft: 15, color: 'white'}}>Current mileage: 100,000</Text>
        {/* Should make a variable to display current mileage */}
        <Text style={{fontSize: 25, marginLeft: 15, color: 'white'}}>          (km)</Text>
      </View>
      
      {isViewVisible && (
        <View style={styles.inputDataView}> 
          <ScrollView style={{marginBottom: 10, padding: 3}}>
            <View style={{backgroundColor:'white', borderRadius: 20}}>
              <Text style={styles.inputDataText}>Last Mileage when the service was done (Km): </Text>
              <TextInput 
                value={serMileage}
                onChangeText={(text) => setMileage(text)}
                keyboardType='numeric'
                placeholder="Enter"
                style={{marginTop: 5, fontSize: 15, marginBottom: 10, marginLeft: 15}}
              />
            </View>
            <View style={{backgroundColor:'white', borderRadius: 20, marginTop: 10}}>
              <Text style={styles.inputDataText}>Out of the below, what were the things done in the last service:</Text>
              {parts.map((part, index) => (
                <View key={index}>
                  <CheckBox
                    checked={checkedItems[index]}
                    onPress={() => {
                      const updatedCheckedItems = [...checkedItems];
                      updatedCheckedItems[index] = !updatedCheckedItems[index];
                      setCheckedItems(updatedCheckedItems);
                      // const checkedItemsTransfer = checkedItems.map(item => item ? 1 : 0);
                      // console.log(checkedItemsTransfer);
                      // sendDataToSpringboot(checkedItemsTransfer);
                      // handleSavePress;
                    }}
                    title={part}
                  />
                </View>
              ))}
            </View>
            <TouchableOpacity onPress={handleSavePress} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <Text></Text>
          </ScrollView>
        </View>
      )}
      <StatusBar style="auto" />
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: 'center',
    // justifyContent: 'center',
  },
  inputDataView:{
    marginTop: 20,
    backgroundColor: "#89CFF0",
    width: Dimensions.get("window").width - 15,
    height: Dimensions.get("window").height - 180,
    borderRadius: 20,
    opacity: 0.9,
    padding: 10,
    zIndex: 15,
    borderColor: "white",
    borderWidth: 1,
    position: 'absolute',
    marginTop: 50,
  },
  inputDataText:{
    fontSize: 18,
    padding: 15,
  },
  saveButton:{
    backgroundColor: "black",
    padding: 10,
    justifyContent: "center", 
    marginTop: 10,
    borderRadius: 15,

  },
  saveButtonText:{
    fontSize: 15,
    padding: 10,
    textAlign: 'center',
    color: 'white',
    // paddingBottom: 10,
    // justifyContent: 'center',
  },
  alwaysDisplay:{
    // marginTop: -650,
    backgroundColor: '#89CFF0',
    // width: Dimensions.get("window").width - 25,
    // height: 100,
    borderRadius: 10,
    // position: 'absolute',
    marginTop: 40,
    top: 0,
  },
  serviceHistoryButton:{
    backgroundColor: "#89CFF0",
    borderRadius: 10,
    width: Dimensions.get("window").width - 25,
    // fontSize: 25,
    
  },
  currentMileageBox:{
    backgroundColor: "#89CFF0",
    width: Dimensions.get("window").width - 25,
    height: 100,
    justifyContent:'center',
    marginTop: 25,
    borderRadius: 10,
  }

});
