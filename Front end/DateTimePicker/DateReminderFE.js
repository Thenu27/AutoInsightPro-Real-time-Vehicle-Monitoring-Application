import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DateReminderFE() {
  const [licenseDate, setLicenseDate] = useState(new Date());
  const [licenseTime, setLicenseTime] = useState(new Date());
  const [insuranceDate, setInsuranceDate] = useState(new Date());
  const [insuranceTime, setInsuranceTime] = useState(new Date());
  const [showLicenseDatePicker, setShowLicenseDatePicker] = useState(false);
  const [showLicenseTimePicker, setShowLicenseTimePicker] = useState(false);
  const [showInsuranceDatePicker, setShowInsuranceDatePicker] = useState(false);
  const [showInsuranceTimePicker, setShowInsuranceTimePicker] = useState(false);

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
    // Calculate the time until license and insurance expiry
    const licenseDateTime = new Date(licenseDate.getFullYear(), licenseDate.getMonth(), licenseDate.getDate(), licenseTime.getHours(), licenseTime.getMinutes());
    const insuranceDateTime = new Date(insuranceDate.getFullYear(), insuranceDate.getMonth(), insuranceDate.getDate(), insuranceTime.getHours(), insuranceTime.getMinutes());

    const licenseTimeRemaining = licenseDateTime.getTime() - Date.now();
    const insuranceTimeRemaining = insuranceDateTime.getTime() - Date.now();

    // Set reminder for license expiry
    setTimeout(() => {
      alert('License Expiry Reminder: Your license is about to expire!');
    }, licenseTimeRemaining); 

    // Set reminder for insurance expiry
    setTimeout(() => {
      alert('Insurance Expiry Reminder: Your insurance is about to expire!');
    }, insuranceTimeRemaining);
  };

  const dateTime = { licenseDate, licenseTime, insuranceDate, insuranceTime };

  fetch("http://192.168.1.13:8081/dateTime/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dateTime)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Success:', data);
    // Handle success response from backend
  })
  .catch(error => {
    console.error('Error:', error);
    // Handle any errors
  });

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
            value={licenseDate.toLocaleDateString()}
          />
          {showLicenseDatePicker && (
            <DateTimePicker
              mode='date'
              display='spinner'
              value={licenseDate}
              onChange={handleLicenseDateChange}
              minimumDate={new Date()} // Disable selecting past dates
            />
          )}
          <TextInput
            style={styles.inputBox}
            placeholder='License Expiration Time'
            onFocus={() => setShowLicenseTimePicker(true)}
            value={formatTime(licenseTime)}
          />
          {showLicenseTimePicker && (
            <DateTimePicker
              mode='time'
              display='spinner'
              value={licenseTime}
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
            value={insuranceDate.toLocaleDateString()}
          />
          {showInsuranceDatePicker && (
            <DateTimePicker
              mode='date'
              display='spinner'
              value={insuranceDate}
              onChange={handleInsuranceDateChange}
              minimumDate={new Date()} // Disable selecting past dates
            />
          )}
          <TextInput
            style={styles.inputBox}
            placeholder='Insurance Expiration Time'
            onFocus={() => setShowInsuranceTimePicker(true)}
            value={formatTime(insuranceTime)}
          />
          {showInsuranceTimePicker && (
            <DateTimePicker
              mode='time'
              display='spinner'
              value={insuranceTime}
              onChange={handleInsuranceTimeChange}
            />
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={setReminder}>
          <Text style={styles.buttonText}>Set Reminder</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </View>
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
    height: '90%',
    width: '90%',
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
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
});

