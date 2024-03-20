import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Dimensions, StatusBar, Button, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';


export default function VehicleMain() {
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
    <View style={styles.mainContainer}>

    <Text style={styles.topic}>Vehicle Maintenance Schedule</Text>
      
      <TouchableOpacity  style={styles.serviceHistoryButton} activeOpacity={0.1} onPress={() => setIsViewVisible(true)} >           
      
              <Text style={styles.saveButtonText}>SERVICE HISTORY</Text>
      </TouchableOpacity>
    

      <View style={styles.currentMileageBox}>
        <Text style={{fontSize: 16, marginLeft: 15, color: '#ffffff',fontWeight:'bold'}}>Current mileage(km): 100,000</Text>
        {/* Should make a variable to display current mileage */}
       
      </View>


      <View style={styles.currentMileageBox}>
        <Text style={{fontSize: 16, marginLeft: 15, color: '#ffffff',fontWeight:'bold'}}>Next service at :</Text>
        {/* Should make a variable to display current mileage */}
        
      </View>

      <View style={styles.mainContainer2}>
      <Text style={styles.contentText}>ADD YOUR DETAILS :</Text>
      
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
                style={styles.enterText}
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
      <TouchableOpacity>
        <View style={styles.btn}>
          <Icon name="home" size={30} color="white" />
        </View>
      </TouchableOpacity>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272829',
    alignItems: 'center',
     justifyContent: 'center',
  },

topic:{
  fontSize: 23,
  marginTop:20,
  color:'#ffffff',
  fontWeight:'bold',
  marginBottom:25,

},

mainContainer:{
height:'90%',
width:'90%',
backgroundColor:'#000000',
alignItems: 'center',
justifyContent: 'center',
borderRadius:20,

},

  inputDataView:{
    marginTop: 20,
    backgroundColor: "#272829",
    width: '95%',
    height: '98%',
    borderRadius: 20,
    opacity: 0.9,
    padding: 10,
    zIndex: 15,
    borderColor: "#3AB0FF",
    borderWidth: 1,
    position: 'absolute',
    marginTop: 50,
  },
  inputDataText:{
    fontSize: 18,
    padding: 15,
    fontWeight:'bold',
  },
  saveButton:{
    backgroundColor: "#3AB0FF",
    padding: 5,
    justifyContent: "center", 
    marginTop: 10,
    borderRadius: 25,

  },
  saveButtonText:{
    fontSize: 16,
    padding: 10,
    textAlign: 'center',
    color: '#ffffff',
    fontWeight:'bold',
    
  },
  
  serviceHistoryButton:{
    backgroundColor: "#3AB0FF",
    borderRadius: 100,
    width: 250,
    marginVertical:16,  
    
  },

  currentMileageBox:{    
    borderRadius: 20,
    width: 300,
    marginVertical:16,
    padding:20,
   // marginTop: 25,
    justifyContent:'center',
    width:"90%",  
    backgroundColor:'transparent',
    borderColor:"#3AB0FF",
    borderWidth:1,  
  
  },

  mainContainer2:{
    width:"90%",
    flex:1,
    backgroundColor:'transparent',
    borderColor:"#3AB0FF",
    alignItems:'center',
    borderWidth:1,
    justifyContent:'center',
    borderRadius: 20,
    marginBottom:20,
    marginTop:10,
    padding:10,
  },

contentText:{
  fontSize: 16, 
   color: '#ffffff',
   fontWeight:'bold',
   justifyContent:'center',
   flex:1
},

enterText:{
  marginTop: 5, 
  fontSize: 15,
   marginBottom: 10, 
   marginLeft: 15,
   color:'#3AB0FF',
},
btn: {
  backgroundColor: '#2CB3FF',
  marginTop: 10,
  borderRadius: 30,
  color: 'white',
  width: 60,
  height:60,
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 2,
  borderColor: 'white'
  },
});

