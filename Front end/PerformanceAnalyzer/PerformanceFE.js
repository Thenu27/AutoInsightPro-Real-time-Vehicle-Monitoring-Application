import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit";

const chartConfig = {
  backgroundColor: "#272829",
  backgroundGradientFrom: "#272829",
  backgroundGradientTo: "#272829",
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White color with opacity
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16
  },
  propsForDots: {
    r: "0", // Remove dots                 
  }
};

export default function PerformanceFE() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container1}>
        <Text style={styles.heading}>Performance Analyzer</Text>
       
        
        {/* Vertical ScrollView for text content */}
        <ScrollView contentContainerStyle={styles.scrollViewContent} horizontal={false}>
          <View >

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
          <View style={styles.horizontalContainer}>
            <LineChart
              data={{
                labels: ["January", "February", "March", "April", "May", "June"],
                datasets: [
                  {
                    data: [1, 2, 3, 4, 5, 6, 7, 8,]
                  }
                ]
              }}
              width={Dimensions.get("window").width - 40 } // Adjusted width
              height={220}
              yAxisInterval={1}
              chartConfig={chartConfig}
              bezier={false}
              style={styles.bezierStyle}
            />

<Text style={[styles.text, styles.specialBlue]}>Your Vehicle Speed.</Text>

          </View>
        </ScrollView>

            
          <View style={[styles.container4, ]}>        
          
          <Text style={[styles.text, styles.specialBlue]}>Engine RPM </Text>  
          </View>  

          <View style={[styles.container4, ]}>   
          <Text style={[styles.text, styles.specialBlue]}>Throttle Position </Text>  
          </View>  

          
          <View style={[styles.container4]}>   
          <Text style={[styles.text, styles.specialBlue]}>Engine Load </Text>  
          </View>  

          <View style={[styles.container4 ]}>   
          <Text style={[styles.text, styles.specialBlue]}>Coolant Temperature </Text>  
          </View>
          
          <View style={[styles.container4]}>   
          <Text style={[styles.text, styles.specialBlue]}>Mass Air Flow (MAF) </Text>  
          </View>           
          
            {/* Add more text content here */}
          </View>
        </ScrollView>
      </View>
      <StatusBar style="auto" />
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
    height: '90%',
    width: '90%',
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    padding: 20,
  },
  container4: {
    paddingTop: 5,
    //width:"50%",
    flex: 1,
    backgroundColor: '#272829',
   // borderColor: '#3AB0FF',
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 10,
  },
  spaceBetweenContainers: {
    marginBottom: 10, // Adjust the spacing between containers as needed
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
  specialBlue: {
    color: '#3AB0FF',  
  },
        
});
