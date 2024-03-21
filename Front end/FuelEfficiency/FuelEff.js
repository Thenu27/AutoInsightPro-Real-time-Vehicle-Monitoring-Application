import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const FuelEff = ({navigation}) => {
  
  const [distance, setDistance] = useState(0);
  const [FCunsumption,setCunsumption] = useState(0);
  const [PCunsumption,setPCunsumption] = useState(0);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.box, { width: 340}]}>
          <Text style={[styles.text2,]}>Remaining Distance</Text>
          <Text style={styles.text3}>{distance}<Text style={styles.text2}> KM</Text></Text>
        </View>
        <View style={[styles.box, { height: 180, width: 340}]}>
          <Text style={styles.text2}>Current Consumption</Text>
          <Text style={styles.text3}>{FCunsumption}<Text style={styles.text2}> KM/L</Text></Text>
        </View>
        <View style={[styles.box, { height: 280 }]}>
          <Text style={styles.text2}>Potential Consumption</Text>
          <Text style={[styles.text3, {marginTop: 0}]}>{PCunsumption}<Text style={styles.text2}> KM/L</Text></Text>
          <TouchableOpacity onPress={() => navigation.navigate('Tips')}>
          <View style={styles.innerBox}>
            <Text style={styles.text2}>LEARN TIPS TO SAVE</Text>
            <Text style={styles.text2}>MONEY {'>'}</Text>
          </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <View style={styles.btn}>
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
    } 
  });

export default FuelEff