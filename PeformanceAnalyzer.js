import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PeformaceAnalyzer from './PeformanceAnalyzer';
 
export default function PeformanceAnalyzer(){
    return(
        <View style ={styles.container}>

           <Text style={styles.textStyle}>Peformance Analyzer</Text>

        </View>

    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#333333',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textStyle: {
      fontSize: 40,
      color: 'white',
      fontFamily: "Times New Roman"
    },
  });