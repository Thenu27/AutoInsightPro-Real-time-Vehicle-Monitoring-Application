import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const FuelEff = ({navigation}) => {
  

  const [distance, setDistance] = useState(0);
  const [FCunsumption,setCunsumption] = useState(0);
  const [PCunsumption,setPCunsumption] = useState(0);
  const [startingMileage, setStartingMileage] = useState('');
  const [endingMileage, setEndingMileage] = useState('');
  const [displacement, setDisplacement] = useState('');

  const CalculateDisplacement = () => {
    if (startingMileage && endingMileage) {
      const displacementValue = parseInt(endingMileage) - parseInt(startingMileage);
      setDisplacement(displacementValue.toString());
      console.log(displacement);
    } 
  };
  const sendDisplacementToSpringBoot = () => {
    const data = {
      displacement: parseInt(displacement),
    };
  
    fetch('http://192.168.1.182:8080/displacement', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.text())
    .then(responseText => {
        console.log('Response from Spring Boot:', responseText);

        const digitsOnly = responseText.replace(/[^\d.]/g, '');
        console.log('Digits only:', digitsOnly);
        setPCunsumption(digitsOnly);
    })
    .catch(error => {
        console.error('Error sending displacement to Spring Boot:', error);
    });
  };
   


  return (
    <SafeAreaView style={styles.container}>
        <View><Text style={[styles.text,]}>FUEL EFFICIENCY TRACKER</Text></View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.box, { width: 340}]}>
          <Text style={[styles.text2,]}>Remaining Distance</Text>
          <Text style={styles.text3}>{distance}<Text style={styles.text2}> KM</Text></Text>
        </View>
        <View style={[styles.box, { height: 180, width: 340}]}>
          <Text style={styles.text2}>Current Consumption</Text>
          <Text style={styles.text3}>{FCunsumption}<Text style={styles.text2}> Mpg</Text></Text>
        </View>
        <View style={[styles.box, { height: 350, width: 340}]}>
        <Text style={[styles.text2,]}>Enter Displacement</Text>
        <Text style={[styles.text2, {fontSize: 20}]}>Starting Mileage:</Text>
        <TextInput
            style={styles.input}
            value={startingMileage}
            onChangeText={text => setStartingMileage(text)}
            keyboardType="numeric"
          />
        <Text style={[styles.text2, {fontSize: 20}]}>Ending Mileage:</Text>
        <TextInput
            style={styles.input}
            value={endingMileage}
            onChangeText={text => setEndingMileage(text)}
            keyboardType="numeric"
        />
        <TouchableOpacity onPress={() => {
              CalculateDisplacement();
              sendDisplacementToSpringBoot();
            }}>
          <View style={[styles.btn, { width: 150, height: 50, marginLeft: 17 }]}>
            <Text style={[styles.text2, {fontSize: 20, marginTop: 0}]}>Enter</Text>
          </View>
        </TouchableOpacity>
        </View>
        <View style={[styles.box, { height: 280 }]}>
          <Text style={styles.text2}>Potential Consumption</Text>
          <Text style={[styles.text3, {marginTop: 0}]}>{PCunsumption}<Text style={styles.text2}> Mpg</Text></Text>
          <TouchableOpacity onPress={() => navigation.navigate('Tips')}>
          <View style={styles.innerBox}>
            <Text style={styles.text2}>LEARN TIPS TO SAVE</Text>
            <Text style={styles.text2}>MONEY {'>'}</Text>
          </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <View style={[styles.btn]}>
            <Icon name="home" size={30} color="white" />
            </View>
          </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#282828',
      alignItems: "center",
    },
    scrollContainer: {
      alignItems: 'center',
      width: '100%',
    },
    text: {
      marginTop: 10,
      color: 'white',
      fontFamily: 'Arial',
      fontSize: 20,
      fontWeight: 'bold',
    },
    text2: {
      marginTop: 20,
      marginLeft: 20,
      marginRight:20,
      color: 'white',
      fontFamily: 'Arial',
      fontSize: 25,
      fontWeight: 'bold',
    },
    text3: {
      marginTop: 10,
      marginLeft: 20,
      color: 'white',
      fontFamily: 'Arial',
      fontSize: 80,
      fontWeight: 'bold',
    },
    blueText: {
      color: '#2CB3FF',
    },
    box: {
      backgroundColor: '#191919',
      height: 170,
      borderRadius: 10,
      marginTop: 30,
      width: '90%',
      maxWidth: 340,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.8,
      elevation: 5,
    },
    innerBox: {
      backgroundColor: '#606060',
      borderRadius: 10,
      marginTop: 15,
      width: '90%',
      height: 110,
      marginLeft: 17,
      marginRight: 20,
    },
    btn: {
      backgroundColor: '#2CB3FF',
      marginTop: 10,
      borderRadius: 40,
      color: 'white',
      width: 80,
      height:80,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: 'white'
      },
    text4: {
      color: 'white',
    },
    input: {
      marginTop: 10,
      marginLeft: 17,
      width: '70%',
      height: 40,
      borderWidth: 1,
      borderColor: '#2CB3FF',
      backgroundColor: 'gray',
      borderRadius: 20,
      paddingHorizontal: 10,
      marginBottom: 20,
      color: 'white',
      fontWeight: 'bold',
    },
  });

export default FuelEff