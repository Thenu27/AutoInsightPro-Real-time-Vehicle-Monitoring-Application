import React, { useState, useEffect } from 'react';
import { Alert, View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Button } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

export default function HealthReport() {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  
  const onFromChange = (event, selectedDate) => {
    setShowFromPicker(false); // Hide picker after selection
    if (selectedDate) {
      setFromDate(selectedDate);
    }
  };
  const [reportData, setReportData] = useState('');


  const onToChange = (event, selectedDate) => {
    setShowToPicker(false); // Hide picker after selection
    if (selectedDate) {
      setToDate(selectedDate);
    }
  };
  const handlePress = async () => {
    try {
        const response = await fetch('http://10.36.6.78:8080/api/generate-report');
        const data = await response.text();
        console.log(data);
        setReportData(data); // Save the fetched report data to state
    } catch (error) {
        console.error('There was an error fetching the health report:', error);
        Alert.alert("Error", "There was an error fetching the health report.");
    }
};

  


  
  return (
    <ScrollView style={styles.container}>
    

      <Text style={styles.headerStyle}>Date period</Text>
      <View style={styles.datePickerContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setShowFromPicker(true)}>
          <Text style={styles.buttonText}>From: {fromDate.toLocaleDateString()}</Text>
        </TouchableOpacity>
        <Modal visible={showFromPicker} transparent={true} animationType="slide">
          <View style={styles.modalView}>
            <DateTimePicker
              value={fromDate}
              mode="date"
              display="default"
              onChange={onFromChange}
            />
            <Button title="Done" onPress={() => setShowFromPicker(false)} />
          </View>
        </Modal>

        <TouchableOpacity style={styles.button} onPress={() => setShowToPicker(true)}>
          <Text style={styles.buttonText}>To: {toDate.toLocaleDateString()}</Text>
        </TouchableOpacity>
        <Modal visible={showToPicker} transparent={true} animationType="slide">
          <View style={styles.modalView}>
            <DateTimePicker
              value={toDate}
              mode="date"
              display="default"
              onChange={onToChange}
            />
            <Button title="Done" onPress={() => setShowToPicker(false)} />
          </View>
        </Modal>
      </View>

<Text style={styles.reportDataStyle}>{reportData}</Text>

     
      
      <TouchableOpacity style={styles.buttonStyle} onPress={handlePress}>
        <Text style={styles.centreText}>GENERATE HEALTH REPORT</Text>
      </TouchableOpacity>
      
      

      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
  headerStyle: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Times New Roman',
    textAlign: 'center',
    marginTop: 30,
    marginLeft: 10,
  },
  reportDataStyle: {
    fontSize: 20,
    color: 'white',

    textAlign: 'left',
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  datePickerContainer: {
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
    marginLeft:90,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    
  },
  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50%',
    marginHorizontal: '20%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonStyle: {
    marginTop: 100,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: 'blue',
    borderRadius: 25,
  },
  centreText:{
    textAlign:"center",
    color:'white',
    fontSize:"25"
  }
});
