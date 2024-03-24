import React from 'react'
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';

const Tips = (navigation) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <View style={styles.center}>
          <Text style={styles.text2}>Tips Save Money on Gas</Text>
        </View>
          <Text style={[styles.text, {paddingTop: 20, paddingLeft: 10, paddingRight: 10, marginLeft: 5}]}> <Text style={[styles.text2, styles.blueText]}>Drive Smoothly:</Text> Avoid rapid acceleration and sudden braking, 
          as these actions can waste fuel. Accelerate gradually and maintain a steady speed whenever possible.</Text>
          <Text style={[styles.text, {paddingTop: 20, paddingLeft: 10, paddingRight: 10, marginLeft: 5}]}> <Text style={[styles.text2, styles.blueText]}>Maintain a Consistent Speed:</Text> Use cruise control on highways to help maintain a constant speed,
           which can improve fuel efficiency.</Text>
          <Text style={[styles.text, {paddingTop: 20, paddingLeft: 10, paddingRight: 10, marginLeft: 5}]}> <Text style={[styles.text2, styles.blueText]}>Plan Your Trips Efficiently:</Text> Combine errands into one trip to avoid multiple short journeys,
          which can be less fuel-efficient.</Text>
      </View>
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
  box: {
    backgroundColor: '#191919',
    height: 570,
    borderRadius: 10,
    marginTop: 30,
    width: '95%',
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
    center: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    blueText: {
      color: '#2CB3FF',
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
    text: {
      marginTop: 10,
      color: 'white',
      fontFamily: 'Arial',
      fontSize: 20,
    },
  
});

export default Tips