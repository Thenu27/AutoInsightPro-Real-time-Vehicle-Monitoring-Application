import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView ,TextInput,TouchableOpacity,Image} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';

export default function App() {
  const [licenseDate, setLicenseDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleLicenseDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || licenseDate;
    setShowPicker(false);
    setLicenseDate(currentDate);
  };


  const [InsuranceDate, setInsuranceDate] = useState(new Date());
  

  const handleInsuranceDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || InsuranceDate;
    setShowPicker(false);
    setInsuranceDate(currentDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subView}>
        <Text style={styles.heading}>Expiry Date Reminder</Text>

        <Image
          source={{uri: 'https://paceperformance.com/images/F147747039'}}
          style={{width: 200, height: 250, marginBottom: 20}} // Adjust width and height as needed
        />



<Text style={styles.nrrText}>
          Enter<Text style={styles.specialBlue}> License Expiration Date</Text>
        </Text>

        <TextInput
          style={styles.inputBox}
          placeholder='License Expiration Date'
          onFocus={() => setShowPicker(true)}
          value={licenseDate.toLocaleDateString()} // Display selected date in the input
        />

        {showPicker && (
          <DateTimePicker
            mode='date'
            display='spinner'
            value={licenseDate}
            onChange={handleLicenseDateChange}
          />
        )}


<Text style={styles.first}>Enter</Text>

<Text style={styles.nrrText }>
          Enter<Text style={styles.specialBlue}> Insurance Expiration Date</Text>
        </Text>

        
        <TextInput
          style={styles.inputBox}
          placeholder='Insurance Expiration Date'
          onFocus={() => setShowPicker(true)}
          value={InsuranceDate.toLocaleDateString()} // Display selected date in the input
        />

        {showPicker && (
          <DateTimePicker
            mode='date'
            display='spinner'
            value={InsuranceDate}
            onChange={handleInsuranceDateChange}
          />
        )}


<Text style={styles.first}>Enter</Text>

        <TouchableOpacity style={styles.button}>
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
  subView: {
    height: '90%', // 90% of screen height
    width: '90%', // 90% of screen width
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  }, 
  heading: {
    paddingTop:50,
    color: '#FFFFFF', // Adjust text color
    fontWeight: 'bold',
    fontSize: 26,
    paddingBottom:10,
  },

  inputBox: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 100,
    paddingHorizontal: 16,
    color: '#ffffff',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    fontWeight: 'bold',
    marginVertical: 16,
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
  nrText: {
    color: '#ffffff',
  },
  nrrText: {
    color: '#ffffff',
    fontWeight: 'bold', 
  },

 first:{paddingTop:10,}
});
