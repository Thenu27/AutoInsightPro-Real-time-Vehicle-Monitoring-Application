// Import necessary modules and components from React and React Native
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Speedometer, {
    Background,
    Arc,
    Needle,
    Progress,
    Marks,
    Indicator,
  } from 'react-native-cool-speedometer';

// Define the main functional component for the vehicle monitoring screen
  function VehiMoniScreen() {
    return (
        <View style={styles.container}>
          <Text                              
            style={{
              fontSize: 25,
              color: 'white',         //Add the name of the application
              bottom: 20,
            }}
          >                                          
          AutoInsight 
            <Text style={{
              color: '#2CB3FF',
              left: 10,
            }}> 
              Pro
            </Text>
          </Text>
              <View style={styles.row}>   
                  <View style={styles.square}>
                      
                      <Speedometer
                        value={100}
                        fontFamily='squada-one'
                        width={170}                             //Add first meter for Speed
                        height={170}
                      >
                        <Background />
                        <Arc/>
                        <Needle
                         circleColor='#2CB3FF'
                        />
                        <Progress
                         color='#2CB3FF'
                        />
                        <Marks
                          fontSize={12}
                        />
                        <Indicator
                          fontSize={25}
                        />
                      </Speedometer>
                      <Text 
                        style={{
                          fontSize: 15,
                          color: "white",
                        }}
                      >
                        Speed
                      </Text>
                  </View>
                  <View style={styles.square}>
                     
                      <Speedometer
                        value={0.5}
                        fontFamily='squada-one'
                        width={170}                               //Add second meter for Fuel level
                        height={170}
                        max={1}
                      >
                        <Background />
                        <Arc/>
                        <Needle
                         circleColor='#2CB3FF'
                        />
                        <Progress
                         color='#2CB3FF'
                        />
                        <Marks
                          fontSize={12}
                          step={0.25}
                        />
                        {/*<Indicator
                          fontSize={25}
                      />*/}
                      </Speedometer>
                      <Text 
                        style={{
                          fontSize: 15,
                          color: "white",
                        }}
                      >
                        Fuel level
                      </Text>
                  </View>
              </View>
              <View style={styles.row}>
                  <View style={styles.square}>
                      
                      <Speedometer
                        value={4000}
                        fontFamily='squada-one'
                        width={170}                                 //Add thired meter for RPM
                        height={170}
                        max={8000}
                      >
                        <Background />
                        <Arc/>
                        <Needle
                         circleColor='#2CB3FF'
                        />
                        <Progress
                         color='#2CB3FF'
                        />
                        <Marks
                          fontSize={12}
                          step={1000}
                        />
                        <Indicator
                          fontSize={20}
                      />
                      </Speedometer>
                      <Text 
                        style={{
                          fontSize: 15,
                          color: "white",
                        }}
                      >RPM
                      </Text>
                  </View>
                  <View style={styles.square}>
                      
                      <Speedometer
                        value={100}
                        fontFamily='squada-one'
                        width={170}                          //Add forth  meter for Coolent temperature
                        height={170}
                        min={50}
                        max={130}
                      >
                        <Background />
                        <Arc/>
                        <Needle
                         circleColor='#2CB3FF'
                        />
                        <Progress
                         color='#2CB3FF'
                        />
                        <Marks
                          fontSize={12}
                        />
                        <Indicator
                          fontSize={25}
                          
                        />
                      </Speedometer>
                      <Text 
                        style={{
                          fontSize: 15,
                          color: "white",
                        }}
                      >
                        Coolant Temperature
                      </Text>
                  </View>
              </View>
              <View style={styles.row}>
                  <View style={styles.square}>
                      <Text 
                        style={{
                          fontSize: 15,
                          color: '#2CB3FF',
                          bottom: 70,                                 // Add a square for shoe ML result
                        }}
                      >
                      Prediction
                      </Text>
                      <Text 
                        style={{
                          fontSize: 15,
                          color: "white",
                          
                        }}
                      >
                      Showing result...
                      </Text>
                      
                  </View>
                  <View style={styles.square}>
                  <Text 
                        style={{
                          fontSize: 15,
                          color: '#2CB3FF',
                          bottom: 70,                              // Add a square for shoe ML result
                        }}
                      >
                      Prediction
                      </Text>
                      <Text 
                        style={{
                          fontSize: 15,
                          color: "white",
                          
                        }}
                      >
                      Showing result...
                      </Text>
                      
                  </View>
              </View>
         </View>
    );
}

// Define styles using StyleSheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: "#282828",
        
    },
    row: {
        flexDirection: 'row',
        backgroundColor: "#191919",
    },
    square: {
        flex: 1, 
        aspectRatio: 1, 
        borderWidth: 3,
        borderColor: '#282828',
        borderRadius: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#191919",
    },  
  });


// Export the component as the default export
  export default VehiMoniScreen;