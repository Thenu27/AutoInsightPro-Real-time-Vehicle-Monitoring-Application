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

function VehiMoniScreen() {
    return (
        <View style={styles.container}>
          <Text 
            style={{
              fontSize: 25,
              color: 'white',
              bottom: 105,
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
                        width={170}
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
                        value={0.1}
                        fontFamily='squada-one'
                        width={170}
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
                        width={170}
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
                        value={75}
                        fontFamily='squada-one'
                        width={170}
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
         </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column', // Main axis
        justifyContent: 'center', // Align items vertically
        alignItems: 'center', // Align items horizontally
        backgroundColor: "#282828",
        
    },
    row: {
        flexDirection: 'row', // Sub axis (horizontal)
        backgroundColor: "#191919",
    },
    square: {
        flex: 1, // Each square takes equal space
        aspectRatio: 1, // To ensure squares are squares
        borderWidth: 3,
        borderColor: '#282828',
        borderRadius: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#191919",
    },  
  });


export default VehiMoniScreen;