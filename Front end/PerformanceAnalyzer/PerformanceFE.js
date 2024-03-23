import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions ,TouchableOpacity} from 'react-native';
import { LineChart } from "react-native-chart-kit";
import Icon from 'react-native-vector-icons/FontAwesome';

const chartConfig = {
  backgroundColor: "#272829",
  backgroundGradientFrom: "#272829",
  backgroundGradientTo: "#272829",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, //white colour opacity
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16
  },
  propsForDots: {
    r: "0", // Remove dots                 
  }, 
 
};

export default function PerformanceFE() {

fetch()
.then(response => response.json())
.then(data => {
  setHighestVehicleSpeed(data);
  })
  .then(data => {
    setLowestVehicleSpeed(data);
    })
    .then(data => {
      setEngineRPM(data);
      })
      .then(data => {
        setThrottlePosition(data);
        })
        .then(data => {
          setEngineLoad(data);
          })
          .then(data => {
            setCoolentTemp(data);
            })
            .then(data => {
              setMassAirFlow(data);
              })
  .catch(error => console.error(error));
  
  EngineRPM
  const[HighestVehicleSpeed,setHighestVehicleSpeed]=useState(0);
  const[LowestVehicleSpeed,setLowestVehicleSpeed]=useState(0);
  
  const[EngineRPM,setEngineRPM]=useState(0);
  const[ThrottlePosition,setThrottlePosition]=useState(0);
  const[EngineLoad,setEngineLoad]=useState(0);
  const[CoolentTemp,setCoolentTemp]=useState(0);
  const[MassAirFlow,setMassAirFlow]=useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container1}>
        <Text style={styles.heading}>Performance Analyzer</Text>
        
        {/* Vertical ScrollView for text content */}
        <ScrollView contentContainerStyle={styles.scrollViewContent} horizontal={false}>
          <View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
              <View style={styles.horizontalContainer}>
                
              <View style={styles.mainContainner1}> 
              <LineChart
  data={{
    labels: Array.from({ length: 12 }, (_, i) => `${i * 5 + 5}`), // Time labels for each 5-minute interval
    datasets: [
      {
        data: [30, 40, 35, 50, 45, 60, 55, 65, 70, 75, 80, 85, 90, 50], // Example speed data for the first 20 minutes
      },
    ],
  }}
  width={Dimensions.get("window").width } // Adjusted width
  height={220}
  yAxisInterval={10} // Adjust the interval according to your data range
  chartConfig={chartConfig}
  bezier={false}
  style={styles.bezierStyle}
/>


                <Text style={[styles.chartdescrip,styles.specialBlue]}>Your Vehicle Speed.</Text>


                <View style={styles.container5}>
              <Text style={[styles.text, styles.specialBlue]}>Highest Vehicle Speed</Text>
              <View style={styles.container4}>               
              <Text style={styles.text5}>{HighestVehicleSpeed}</Text>
              </View>
            </View>

            <View style={styles.container5}>
              <Text style={[styles.text, styles.specialBlue]}>Lowest Vehicle Speed</Text>
              <View style={styles.container4}>               
              <Text style={styles.text5}>{LowestVehicleSpeed}</Text>
              </View>
            </View>
                </View>

              </View>
            </ScrollView>

        <View style={styles.mainContainner2}>  
            <View style={styles.container5}>
              <Text style={[styles.text, styles.specialBlue]}>Engine RPM</Text>
              <View style={styles.container4}>               
              <Text style={styles.text5}>{EngineRPM}</Text>
              </View>
            </View>

            <View style={styles.container5}>
              <Text style={[styles.text, styles.specialBlue]}>Throttle Position</Text>
              <View style={styles.container4}>               
              <Text style={styles.text5}>{ThrottlePosition}</Text>
              </View>
            </View>

            <View style={styles.container5}>
              <Text style={[styles.text, styles.specialBlue]}>Engine Load</Text>
              <View style={styles.container4}>               
              <Text style={styles.text5}>{EngineLoad}</Text>
              </View>
            </View>

            <View style={styles.container5}>
              <Text style={[styles.text, styles.specialBlue]}>Coolent Temp.</Text>
              <View style={styles.container4}>               
              <Text style={styles.text5}>{CoolentTemp}</Text>
              </View>
            </View>

            <View style={styles.container5}>
              <Text style={[styles.text, styles.specialBlue]}>Mass Air Flow</Text>
              <View style={styles.container4}>               
                <Text style={styles.text5}>{MassAirFlow}</Text>
              </View>
            </View>           

        </View>


          </View>
        </ScrollView>
              </View>      
      <StatusBar style="auto" />


      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <View style={styles.btn}>
        <Icon name="home" size={30} color="white" />
        </View>
      </TouchableOpacity> 

    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272829',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1: {
    height: '85%',
    width: '90%',
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    padding: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  heading: {
    paddingTop: 50,
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 26,
    paddingBottom: 10,
    marginBottom: 20,
  },
  bezierStyle: {
    marginVertical: 8,
    borderRadius: 16,
    color: '#3AB0FF'
  },
  horizontalContainer: {
    marginRight: 10, // Add some spacing between charts
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 10,
  },
  text5: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 10,    
    paddingTop:3,
    paddingRight:20,
    textAlign:'center',
  },

  specialBlue: {
    color: '#3AB0FF',  
  },
  container5: {
    flexDirection: 'row', // Display children in a row
    alignItems: 'center', // Center vertically
    marginBottom: 10,
  },
  container4: {
    flex: 1,
    backgroundColor: '#272829',
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 20,
    marginLeft: 10,
    //padding: 10,
  
  },
  
  mainContainner1: {
    width:"100%",
    flex: 1,
    backgroundColor: 'transparent',
    borderColor: '#3AB0FF',
    alignItems: 'center',   
   borderBottomWidth:1,
   borderTopWidth:1,
    justifyContent: 'center',    
    padding:10,
    marginBottom:20,
  },

  mainContainner2: {
    width:"100%",
    flex: 1,
    backgroundColor: 'transparent',
    borderColor: '#3AB0FF',
    alignItems: 'center',
    borderWidth: 1,   
    justifyContent: 'center',
    borderRadius: 20,
    padding:10,
    marginBottom:20,
  },
  chartdescrip:{
    color: '#FFFFFF',
    fontSize: 13,
    marginBottom: 50,
    fontWeight: 'bold', 
  },

  btn: {
    backgroundColor: '#2CB3FF',
    marginTop: 10,
    borderRadius: 30,
    color: 'white',
    width: 60,
    height:60,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },

});
