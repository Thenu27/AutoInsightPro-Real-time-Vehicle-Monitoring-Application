import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';


const DropdownComponent = ({ data }) => {// Define the DropdownComponent outside of the Login component
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View >
      <Dropdown
        style={[styles.dropdown, isFocus ]}
        placeholderStyle={styles.placeholderStyle} // Updated placeholderStyle
        selectedTextStyle={styles.selectedTextStyle}
        
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder= 'Fuel type'
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default function Login({ navigation }) {
  const data = [
    { label: 'Petrol', value: '1' },
    { label: 'Diesel', value: '2' },
  ];

  return (
    <SafeAreaView style={styles.container2}>
      <View style={styles.container}>
        <Text style={styles.login}>LOGIN</Text>
        <Text style={styles.nrText}>
          Please enter your <Text style={styles.specialBlue}>details</Text>
        </Text>     
        <View>
          <TextInput style={styles.inputBox} placeholder='Engine Capacity' />
          <DropdownComponent data={data} />
          <TextInput style={styles.inputBox} placeholder='Manufacture Year' />
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.nrText}>
          Already have an account?<Text style={styles.specialBlue} onPress={() => navigation.navigate("Home")}> Your Account</Text>
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
    height: 650,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center', 
  },
  container2: {
    flex: 1,
    backgroundColor: '#272829',
    alignItems: 'center',
    justifyContent: 'flex-end',
    color:'#FFFFFF',
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

placeholderStyle:{
  fontSize: 16,
  fontWeight: 'bold',
  color: '#28282B',
  
},

  login: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 26,
  },
  specialBlue: {
    color: '#3AB0FF',
  },
  nrText: {
    color: '#ffffff',
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
    //fontSize: 16, 
    fontWeight: 'bold',
  },

  
});
