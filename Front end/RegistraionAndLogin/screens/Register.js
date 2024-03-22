import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const DropdownComponent = ({ data, onSelect }) => {
  const [value, setValue] = useState('');

  const handleChange = (item) => {
    setValue(item.value);
    onSelect(item.label); // Pass the selected label to the parent component
  };

  return (
    <View>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder='Fuel Type'
        value={value || null}
        onChange={handleChange}
      />
    </View>
  );
};

const VehicleTypeDropdown = ({ data, onSelect }) => {
  const [value, setValue] = useState('');

  const handleChange = (item) => {
    setValue(item.value);
    onSelect(item.label); // Pass the selected label to the parent component
  };

  return (
    <View>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder='Vehicle Type'
        value={value || null}
        onChange={handleChange}
      />
    </View>
  );
};

export default function Login({ navigation }) {
  const fuelData = [
    { label: 'Petrol', value: '1' },
    { label: 'Diesel', value: '2' },
  ];

  const vehicleTypeData = [
    { label: 'Sedan', value: '1' },
    { label: 'Hatchback', value: '2' },
    { label: 'SUV', value: '3' },
    { label: 'Pickup', value: '4' },
    { label: 'Van', value: '5' },
  ];

  const [fuel, setFuel] = useState('');
  const [type, setVehicleType] = useState('');
  const [vehicleNum, setvehicleNum] = useState('');
  
 
  const [year, setManuYear] = useState('');
  const [ManuYearError, setManuYearError] = useState('');
  const [enteredManuYear, setEnteredManuYear] = useState('');

  const [engineCapacity, setEngineCapacity] = useState('');
  const [EngineCapacityError, setEngineCapacityError] = useState('');
  const [enteredEngineCapacity, setEnteredEngineCapacity] = useState('');

  const [cylinderNum, setCylindersCap] = useState('');
  const [CylindersCapError, setCylindersCapError] = useState('');
 const [enteredCylindersCap, setEnteredCylindersCap] = useState('');
 


  const handleChangeEngineCapacity = (text) => {
    setEnteredEngineCapacity(text);
    if (/^\d*$/.test(text)) {
      setEngineCapacity(text);
      setEngineCapacityError('');
    } else {
      setEngineCapacityError('Please enter only integers for Engine Capacity');
    }
  };

  const handleChangeCylindersCap = (text) => {
    setEnteredCylindersCap(text);
    if (/^\d*$/.test(text)&& Number(text) >= 3) {
      setCylindersCap(text);
      setCylindersCapError('');
    } else {
      setCylindersCapError('Please enter a valid Number of Cylinders');
    }
  };



  const handleChangeManuYear = (text) => {
    setManuYear(text);
    if (/^\d*$/.test(text) && Number(text) >= 2006) {
      setManuYear(text);
      setManuYearError('');
    } else {
      setManuYearError('Manufacture Year must be greater than 2006');
    }
  };

  

   /* fetch("http://192.168.1.13:8080/vehicle-save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vehicle)
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
  };*/



  const handleClick = (e) => {
    e.preventDefault();
  
    // Validate input fields
    if (!vehicleNum || !engineCapacity || !fuel || !type || !year || !cylinderNum) {
      console.error('Please fill in all fields');
      return;
    }
  
    if (EngineCapacityError) {
      console.error('Please enter a valid Engine Capacity');
      return;
    }
  
    if (ManuYearError) {
      console.error('Please enter a valid Manufacture Year');
      return;
    }
  
    if (CylindersCapError) {
      console.error('Please enter a valid Number of Cylinders');
      return;
    }
  
    // Construct payload object
    const payload = {
      vehicleNum,
      engineCapacity: parseInt(engineCapacity),
      fuel,
      type,
      year: parseInt(year),
      cylinderNum: parseInt(cylinderNum),
    };
  
    // Log the payload object
    console.log('Payload:', payload);
  
    // Send POST request to the backend
    fetch("http://192.168.1.13:8080/vehicle-save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
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
  };
  

  return (
    <SafeAreaView style={styles.container2}>
      <View style={styles.container}>
        <Text style={styles. mainText }>REGISTER</Text>
        <Text style={styles.nrText}>
          Please enter your <Text style={styles.specialBlue}>details</Text>
        </Text>
       
        <ScrollView>
          <View  style={styles.scrollViewContent}>
          
          <TextInput
            style={styles.inputBox}
            placeholder='Vehicle Number'
            value={vehicleNum}
            onChangeText={(text) => setvehicleNum(text)}
          />

          <TextInput
            style={styles.inputBox}
            placeholder='Engine Capacity'
            value={engineCapacity}
            onChangeText={handleChangeEngineCapacity}
          />
          {EngineCapacityError ? <Text style={styles.errorText}>{EngineCapacityError}</Text> : null}
         
         
          <DropdownComponent data={fuelData} onSelect={setFuel} />
          <VehicleTypeDropdown data={vehicleTypeData} onSelect={setVehicleType} />

          <TextInput
            style={styles.inputBox}
            placeholder='Number of Cylinders'
            value={cylinderNum}
            onChangeText={handleChangeCylindersCap}
          />
        {CylindersCapError ? <Text style={styles.errorText}>{CylindersCapError}</Text> : null}



          <TextInput
            style={styles.inputBox}
            placeholder='Manufacture Year'
            value={year}
            onChangeText={handleChangeManuYear}
          />
          {ManuYearError ? <Text style={styles.errorText}>{ManuYearError}</Text> : null}
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.button} onPress={handleClick}>
          <Text style={styles.buttonText}>Click for Register</Text>
        </TouchableOpacity>
        <Text style={styles.nrText}>
          Already have an account?<Text style={styles.specialBlue} 
          onPress={() => navigation.navigate("Sign")}>Select Your Account</Text>
        </Text>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    borderTopRightRadius: 100,
    borderTopLeftRadius: 100,
    height: '80%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 16
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28282B',
  },
  mainText: {
    marginTop:20,
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 26,
    marginBottom: 5,
  },
  specialBlue: {
    color: '#3AB0FF',
    
  },
  nrText: {
    color: '#ffffff',
    marginBottom: 10,
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
  dropdown: {
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
    fontWeight: 'bold',
  },
  selectedTextStyle: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
