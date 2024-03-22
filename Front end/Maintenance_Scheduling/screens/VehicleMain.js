import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Dimensions, StatusBar, Button, TouchableOpacity, Alert, ActivityIndicator, SafeAreaView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';


export default function VehicleMain() {
    const [serMileage, setMileage] = useState('');
    const [lastServiceMileage, setLastServiceMileage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [serviceItems, setServiceItems] = useState([]);
    const [progressPercentage, setProgressPercentage] = useState(0);

    useEffect(() => {
      calculateProgressPercentage();
    }, [serMileage, lastServiceMileage]);

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

  // const sendDataToSpringboot = async (dataArray) => {
  //   try {
  //     const response = await axios.post('http://localhost:8080/vehicle/maintenance-details', {currentMileage: dataArray[0], lastServiceMileage: dataArray[1]}, {
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error('Error sending data:', error);
  //   }
  // };

  const [isViewVisible, setIsViewVisible] = useState(true);


  const handleSavePress = () => {
    if (serMileage.trim() !== '') {
      const currentMileageValue = parseInt(serMileage.trim(), 10);
      const lastServiceMileageValue = parseInt(lastServiceMileage.trim(), 10);
  
      if (lastServiceMileageValue >= currentMileageValue) {
        Alert.alert('Last service mileage should be less than current mileage.');
        return; 
      }
  
      if (lastServiceMileage.trim() !== '') {
        setIsLoading(true); 
  
        const checkedItemsTransfer = checkedItems.map(item => item ? 1 : 0);
  
        fetch('http://192.168.1.101:8080/vehicle/maintenance-details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(checkedItemsTransfer),
        })
        .then(response => response.text())
        .then(data => {
          console.log('Success:', data);
          setIsViewVisible(false);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
  
        currentMileage(serMileage, lastServiceMileage);
        fetchServiceItems();
        setTimeout(() => {
          setIsLoading(false);
        }, 1800);
      } else {
        Alert.alert('Please enter the last mileage when servicing.');
      }
    } else {
      Alert.alert('Please enter current mileage.');
    }
  };
  

  const currentMileage = (currentValue, lastServiceMileageValue) => {
    const mileageData = [currentValue, lastServiceMileageValue];
    mileageData.push(parseInt(serMileage, 10));

    fetch('http://192.168.1.101:8080/vehicle/current-Mileage', {
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
  

  const fetchServiceItems = async () => {
    try {
        // ServiceItems([]);
        // setIsLoading(true); 
        const response = await axios.post('http://192.168.1.101:8080/vehicle/next-service-items');
        console.log('Fetched service items:', response.data); 
        setServiceItems(response.data);
    } catch (error) {
        console.error('Error fetching service items:', error);
    }
  };

  const alertServiceDone = () => {
    Alert.alert('SERVICE DONE', 'Press OK only if the service of the vehicle is done.', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () =>  setIsViewVisible(true)},
    ]);
  };

  const calculateProgressPercentage = () => {
    if (serMileage && lastServiceMileage) {
        const currentMileageValue = parseInt(serMileage, 10);
        const lastServiceMileageValue = parseInt(lastServiceMileage, 10);
        const totalDistance = currentMileageValue - lastServiceMileageValue;
        const progress = totalDistance / 10000; 

      
        const progressPercentage = Math.min(1, Math.max(0, progress));
        setProgressPercentage(progressPercentage);
    }
};


  return (
  <SafeAreaView style={styles.container}>
    <View style={styles.mainContainer}>

    {isLoading && <ActivityIndicator size="large" color="#3AB0FF" style={[styles.loadingIndicator, { zIndex: 50 }]} />}


    <Text style={styles.topic}>Vehicle Maintenance Schedule</Text>
    <View style={styles.lineContainer}>
      
      <TouchableOpacity  style={styles.serviceHistoryButton} activeOpacity={0.1} onPress={() => setIsViewVisible(true)} >           
              <Text style={styles.saveButtonText}>SERVICE HISTORY</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn1} onPress={fetchServiceItems}>
          <Icon name="refresh" size={20} color="white" />         
      </TouchableOpacity>
    
      </View>
      <View style={styles.currentMileageBox}>
        <Text style={{fontSize: 16, marginLeft: 15, color: '#ffffff',fontWeight:'bold', marginTop: 7}}>Current mileage(km): </Text>

        <TextInput 
                value={serMileage}
                // onChangeText={(text) => currentMileage(text)}
                onChangeText={setMileage}
                onEndEditing={({ nativeEvent }) => currentMileage(nativeEvent.text, parseInt(lastServiceMileage, 10))}
                keyboardType='numeric'
                placeholder="Enter"
                placeholderTextColor="red"
                // placeholderTextSize
                style={styles.enterCurrentMileage}
              />

       
      </View>

      
      <View style={[styles.currentMileageBox,{flexDirection:'column'}]}>
        {/* <Text style={{fontSize: 16, marginLeft: 15, color: '#ffffff',fontWeight:'bold'}}>Next service at :</Text> */}

        {/* <Text style={{ fontSize: 16, color: '#ffffff', fontWeight: 'bold', marginBottom: 15 }}>Next service at :</Text> */}
        <View style={{marginLeft: 10}}>
          <Progress.Bar progress={progressPercentage} width={250} color={progressPercentage === 1 ? 'red' : '#3AB0FF'} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', marginLeft: 10 }}>
          <Text style={{ color: '#ffffff' , fontSize: 16, fontWeight: 'bold', marginLeft: -15, marginTop: 4}}>Last service</Text>
          <Text style={{ color: '#ffffff' , fontSize: 16, fontWeight: 'bold', marginRight: -32, marginTop: 4 }}>Next service</Text>
      </View>


      </View>
      
      <View style={styles.mainContainer2}>
        <View><Text style={[styles.contentText]}>Things to be done in the next service:</Text></View>
      {/* <Text style={styles.contentText}>Things to be done in the next service:</Text> */}
        <View style={{flex:1}}>
          <ScrollView style={{marginBottom: 10, padding: 3, marginTop: -180, flexGrow: 1, paddingVertical: 10}}>
            {Array.from(new Set(serviceItems)).map((item, index) => (
              <View key={index} style={{backgroundColor: 'white', borderRadius: 20, marginBottom: 10}}>
                <Text style={styles.serviceItemText}>{item}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>

      <TouchableOpacity  style={styles.serviceDoneButton} activeOpacity={0.1} onPress={() => alertServiceDone()} >           
              <Text style={styles.saveButtonText}>SERVICE DONE</Text>
      </TouchableOpacity>
      
      {isViewVisible && (

        <View style={styles.inputDataView}> 
          <ScrollView style={{marginBottom: 10, padding: 3}}>
          <View style={{backgroundColor:'white', borderRadius: 20, marginBottom: 10}}>
              <Text style={styles.inputDataText}>Current Mileage (Km): </Text>
              <TextInput 
                value={serMileage}
                // onChangeText={(text) => setMileage(text)}
                onChangeText={setMileage}
                keyboardType='numeric'
                placeholder="Enter"
                style={styles.enterText}
              />
            </View>
            <View style={{backgroundColor:'white', borderRadius: 20}}>
              <Text style={styles.inputDataText}>Last Mileage when the service was done (Km): </Text>
              <TextInput 
                value={lastServiceMileage}
                // onChangeText={(text) => setMileage(text)}
                onChangeText={setLastServiceMileage}
                keyboardType='numeric'
                placeholder="Enter"
                style={styles.enterText}
              />
            </View>
            <View style={{backgroundColor:'white', borderRadius: 20, marginTop: 10}}>
              <Text style={styles.inputDataText}>Out of the below, what were the things done in the last service    (If the Last service was done within the last 10,000km):</Text>
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
            {/* {isLoading && <ActivityIndicator size="large" color="#3AB0FF" style={styles.loadingIndicator} />} */}
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
  flexDirection: 'row',

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
  flex:1,
//  marginBottom: 50,
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
serviceDoneButton:{
  backgroundColor: "#50C878",
  borderRadius: 100,
  width: 250,
  marginVertical:16,  
  marginBottom: 50,
  
},
enterCurrentMileage: {
  marginLeft: 15,
  fontSize: 15,
  color: 'white',
  fontWeight: 'bold',
  backgroundColor:'transparent',
  width: 90,
  height: 35,
  borderRadius: 2,
  // placeholderTextColor: 'red',
  

},
loadingIndicator:{
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 999,
},

lineContainer: {
  flexDirection: 'row',
  alignItems: 'center', 
},

btn1: {
  marginLeft: 10,
  height: 40,
  width: 40,
  borderRadius: 20,
  backgroundColor: "#3AB0FF",
  justifyContent:'center',
  alignItems: 'center',
},
serviceItemText: {
  fontSize: 16,
  padding: 15,
  fontWeight: 'bold',
},


});

