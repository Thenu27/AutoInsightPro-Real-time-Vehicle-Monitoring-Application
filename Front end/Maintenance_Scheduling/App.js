import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
// import PreviousRecords from './PreviousRecoreds';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <PreviousRecords/> */}
      
      {/*<Text style={{color:'blue'}}>Open up App.js to start working on your app!!</Text>*/}
      <TouchableOpacity style={[styles.topBox, styles.boxSpacing]}>
        <Text style={styles.topBoxText}>Current mileage after servicing</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.topBox, styles.boxSpacing]}>
        <Text style={styles.topBoxText}>Next Mileage at</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.topBox, styles.boxSpacing]}>
        <ScrollView style={{height: 10}}>
          <Text style={styles.topBoxText}>Predicted repairs by the next service</Text>
        </ScrollView>
      </TouchableOpacity>
      {/* <StatusBar style="auto" /> */}
      {/* <View style={styles.topBox}></View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: 'center',
     justifyContent: 'styles.boxSpacing',
    flexDirection: "column",
    padding: 20
  },
  topBox:{
    backgroundColor: "blue",
    width: Dimensions.get("window").width -40,
    flex: 1,
    //margin: 120,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.7,
    shadowRadius: 50,
    elevation: 20,
    justifyContent: 'center'
  },
  boxSpacing:{
    marginVertical: 10,
  },
  topBoxText:{
    color: "white",
    fontSize: 18,
    fontWeight: '500',
    // fontFamily: 'Gill Sans',
    textAlign: 'center'
  }
});
