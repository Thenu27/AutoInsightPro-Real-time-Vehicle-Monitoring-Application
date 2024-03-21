// Import necessary modules and components from React and React Native
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import Speedometer, {
    Background,
    Arc,
    Needle,
    Progress,
    Marks,
    Indicator,
  } from 'react-native-cool-speedometer';
import Icon from 'react-native-vector-icons/FontAwesome';

// Define the main functional component for the vehicle monitoring screen
  function VehiMoniScreen() {
    return (
        <SafeAreaView style={styles.container}>
          <Text                              
            style={{
              fontSize: 23,
              color: 'white',         //Add the name of the application
              bottom: 30,
              paddingTop: 80,
              fontWeight:'bold',
              alignItems:'center',
              textAlign: 'center',
              justifyContent:'center',
            }}
          >                                          
          Real-Time Monitoring &
              <Text                              
                style={{
                  fontSize: 23,
                  color: '#2CB3FF',         //Add the name of the application
                  bottom: 30,
                  paddingTop: 80,
                  fontWeight:'bold',
                  alignItems:'center',
                  textAlign: 'center',
                  justifyContent:'center',
                }}
              >                                          
               <Text>            </Text>Faults Prediction
              </Text>
          </Text>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <View style={styles.row}>   
                  <View style={styles.square}>  
                      <Speedometer
                        value={150}
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
                        value={70}
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
            </ScrollView>     
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.btn}>
            <Icon name="home" size={30} color="white" />
            </View>
          </TouchableOpacity>
        </SafeAreaView>
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
        padding: '100',
        
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
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#191919",
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
      borderColor: 'white',
      marginBottom:15,

      },
    text4: {
      color: 'white',
    }, 
   
    scrollContainer: {
      alignItems: 'center',
      width: '100%',
      justifyContent: 'center',
      flexGrow:1,
    },

  });


// Export the component as the default export
  export default VehiMoniScreen;