import React, { useState, useEffect } from 'react';
import {View, StyleSheet, Text, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import Speedometer, {
  Background,
  Arc,
  Needle,
  Progress,
  Marks,
  Indicator,
} from 'react-native-cool-speedometer';

// Utility function to parse and validate numbers
const parseAndValidate = (value) => {
  const parsed = parseFloat(value);
  return Number.isNaN(parsed) ? 0 : parsed;
};


function VehiMoniScreen() {
  
  const [vehicleSpeed, setVehicleSpeed] = useState(0);
  const [fuelLevel, setFuelLevel] = useState(0.5);
  const [rpm, setRpm] = useState(4000);
  const [coolantTemp, setCoolantTemp] = useState(100);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.1.107:8080/csv/rows');
        const data = await response.json();

        if (data && data.length > 0) {
          // Ensure the interval doesn't exceed the length of the data
          const intervalId = setInterval(() => {
            setCurrentIndex((prevIndex) => {
              const newIndex = (prevIndex + 1) % data.length; // Cycle through data
              const currentItem = data[newIndex];

              setVehicleSpeed(parseAndValidate(currentItem[3]));
              console.log("speed:",parseAndValidate(currentItem[3]))
              
              setFuelLevel(parseAndValidate(currentItem[10]));
              console.log("Fuel:",parseAndValidate(currentItem[10]))

              setRpm(parseAndValidate(currentItem[1]));

              setCoolantTemp(parseAndValidate(currentItem[5]));
              return newIndex;
            });
          }, 1000);

          return () => clearInterval(intervalId); // Clear interval on cleanup
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
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
                        value={vehicleSpeed}
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
                        value={fuelLevel}
                        fontFamily='squada-one'
                        width={170}                               //Add second meter for Fuel level
                        height={170}
                        max={100}
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
                          step={10}
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
                        value={rpm}
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
                        value={coolantTemp}
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