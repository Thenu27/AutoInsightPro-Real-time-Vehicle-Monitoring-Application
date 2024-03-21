
// import React, {useState, useEffect} from 'react';
// import {
//   Text,
//   Alert,
//   View,
//   FlatList,
//   Platform,
//   StatusBar,
//   SafeAreaView,
//   NativeModules,
//   useColorScheme,
//   TouchableOpacity,
//   NativeEventEmitter,
//   PermissionsAndroid,
// } from 'react-native';
// import BleManager from 'react-native-ble-manager';
// import {Colors} from 'react-native/Libraries/NewAppScreen';
// import {DeviceList} from './android/app/src/DeviceList.jsx';
// import {styles} from './android/app/src/styles/styles.jsx';

// const BleManagerModule = NativeModules.BleManager;
// const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

// const App = () => {
//   const peripherals = new Map();
//   const [isScanning, setIsScanning] = useState(false);
//   const [connectedDevices, setConnectedDevices] = useState([]);
//   const [discoveredDevices, setDiscoveredDevices] = useState([]);
//   const handleGetConnectedDevices = () => {
//     BleManager.getBondedPeripherals([]).then(results => {
//       for (let i = 0; i < results.length; i++) {
//         let peripheral = results[i];
//         peripheral.connected = true;
//         peripherals.set(peripheral.id, peripheral);
//         setConnectedDevices(Array.from(peripherals.values()));
//       }
//     });
//   };
//   useEffect(() => {
//     //console.log('BleManager:', BleManager);
//     BleManager.enableBluetooth().then(() => {
//       console.log('Bluetooth is turned on!');
//     });
//     BleManager.start({showAlert: false}).then(() => {
//       console.log('BleManager initialized');
//       handleGetConnectedDevices();
//     });
//     let stopDiscoverListener = BleManagerEmitter.addListener(
//       'BleManagerDiscoverPeripheral',
//       peripheral => {
//         peripherals.set(peripheral.id, peripheral);
//         setDiscoveredDevices(Array.from(peripherals.values()));
//       },
//     );
//     let stopConnectListener = BleManagerEmitter.addListener(
//       'BleManagerConnectPeripheral',
//       peripheral => {
//         console.log('BleManagerConnectPeripheral:', peripheral);
//       },
//     );
//     let stopScanListener = BleManagerEmitter.addListener(
//       'BleManagerStopScan',
//       () => {
//         setIsScanning(false);
//         console.log('scan stopped');
//       },
//     );
//     if (Platform.OS === 'android' && Platform.Version >= 23) {
//       PermissionsAndroid.check(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       ).then(result => {
//         if (result) {
//           console.log('Permission is OK');
//         } else {
//           PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           ).then(result => {
//             if (result) {
//               console.log('User accepted');
//             } else {
//               console.log('User refused');
//             }
//           });
//         }
//       });
//     }
//     return () => {
//       stopDiscoverListener.remove();
//       stopConnectListener.remove();
//       stopScanListener.remove();
//     };
//   }, []);
//   const startScan = () => {
//     if (!isScanning) {
//       BleManager.scan([], 5, true)
//         .then(() => {
//           console.log('Scanning...');
//           setIsScanning(true);
//         })
//         .catch(error => {
//           console.error(error);
//         });
//     }
//   };
//   // pair with device first before connecting to it
//   const connectToPeripheral = peripheral => {
//     BleManager.createBond(peripheral.id)
//       .then(() => {
//         peripheral.connected = true;
//         peripherals.set(peripheral.id, peripheral);
//         setConnectedDevices(Array.from(peripherals.values()));
//         setDiscoveredDevices(Array.from(peripherals.values()));
//         console.log('BLE device paired successfully');
//       })
//       .catch(() => {
//         console.log('failed to bond');
//       });
//   };
//   // disconnect from device
//   const disconnectFromPeripheral = peripheral => {
//     BleManager.removeBond(peripheral.id)
//       .then(() => {
//         peripheral.connected = false;
//         peripherals.set(peripheral.id, peripheral);
//         setConnectedDevices(Array.from(peripherals.values()));
//         setDiscoveredDevices(Array.from(peripherals.values()));
//         Alert.alert(`Disconnected from ${peripheral.name}`);
//       })
//       .catch(() => {
//         console.log('fail to remove the bond');
//       });
//   };
//   const isDarkMode = useColorScheme() === 'dark';
//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };
//   // render list of bluetooth devices
//   return (
//     <SafeAreaView style={[backgroundStyle, styles.container]}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <View style={{pdadingHorizontal: 20}}>
//         <Text
//           style={[
//             styles.title,
//             {color: isDarkMode ? Colors.white : Colors.black},
//           ]}>
//           React Native BLE Manager Tutorial
//         </Text>
//         <TouchableOpacity
//           activeOpacity={0.5}
//           style={styles.scanButton}
//           onPress={startScan}>
//           <Text style={styles.scanButtonText}>
//             {isScanning ? 'Scanning...' : 'Scan Bluetooth Devices'}
//           </Text>
//         </TouchableOpacity>
//         <Text
//           style={[
//             styles.subtitle,
//             {color: isDarkMode ? Colors.white : Colors.black},
//           ]}>
//           Discovered Devices:
//         </Text>
//         {discoveredDevices.length > 0 ? (
//           <FlatList
//             data={discoveredDevices}
//             renderItem={({item}) => (
//               <DeviceList
//                 peripheral={item}
//                 connect={connectToPeripheral}
//                 disconnect={disconnectFromPeripheral}
//               />
//             )}
//             keyExtractor={item => item.id}
//           />
//         ) : (
//           <Text style={styles.noDevicesText}>No Bluetooth devices found</Text>
//         )}
//         <Text
//           style={[
//             styles.subtitle,
//             {color: isDarkMode ? Colors.white : Colors.black},
//           ]}>
//           Connected Devices:
//         </Text>
//         {connectedDevices.length > 0 ? (
//           <FlatList
//             data={connectedDevices}
//             renderItem={({item}) => (
//               <DeviceList
//                 peripheral={item}
//                 connect={connectToPeripheral}
//                 disconnect={disconnectFromPeripheral}
//               />
//             )}
//             keyExtractor={item => item.id}
//           />
//         ) : (
//           <Text style={styles.noDevicesText}>No connected devices</Text>
//         )}
//       </View>
//     </SafeAreaView>
//   );
// };
// export default App;
import React, {useState, useEffect} from 'react';
import {
  Text,
  Alert,
  View,
  FlatList,
  Platform,
  StatusBar,
  SafeAreaView,
  NativeModules,
  useColorScheme,
  TouchableOpacity,
  NativeEventEmitter,
  PermissionsAndroid,
} from 'react-native';
import {StyleSheet, Dimensions} from 'react-native';

import BleManager from 'react-native-ble-manager';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {DeviceList} from './android/app/src/DeviceList.jsx';
import Icon from 'react-native-vector-icons/FontAwesome';

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

const App = () => {
  const peripherals = new Map();
  const [isScanning, setIsScanning] = useState(false);
  const [connectedDevices, setConnectedDevices] = useState([]);
  const [discoveredDevices, setDiscoveredDevices] = useState([]);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false);

  useEffect(() => {
    BleManager.enableBluetooth()
      .then(() => {
        console.log('Bluetooth is turned on!');
        setBluetoothEnabled(true);
      })
      .catch(() => {
        console.log('Failed to enable Bluetooth');
        setBluetoothEnabled(false);
      });

    BleManager.start({showAlert: false})
      .then(() => {
        console.log('BleManager initialized');
        handleGetConnectedDevices();
      })
      .catch(error => {
        console.error('Error initializing BleManager:', error);
      });

    const stopDiscoverListener = BleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      peripheral => {
        peripherals.set(peripheral.id, peripheral);
        setDiscoveredDevices(Array.from(peripherals.values()));
      },
    );

    const stopConnectListener = BleManagerEmitter.addListener(
      'BleManagerConnectPeripheral',
      peripheral => {
        console.log('BleManagerConnectPeripheral:', peripheral);
      },
    );

    const stopScanListener = BleManagerEmitter.addListener(
      'BleManagerStopScan',
      () => {
        setIsScanning(false);
        console.log('Scan stopped');
      },
    );

    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(result => {
        if (result) {
          console.log('Permission is OK');
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ).then(result => {
            if (result) {
              console.log('User accepted');
            } else {
              console.log('User refused');
            }
          });
        }
      });
    }

    return () => {
      stopDiscoverListener.remove();
      stopConnectListener.remove();
      stopScanListener.remove();
    };
  }, []);

  const handleGetConnectedDevices = () => {
    BleManager.getBondedPeripherals([]).then(results => {
      for (let i = 0; i < results.length; i++) {
        let peripheral = results[i];
        peripheral.connected = true;
        peripherals.set(peripheral.id, peripheral);
        setConnectedDevices(Array.from(peripherals.values()));
      }
    });
  };

  const startScan = () => {
    if (!isScanning) {
      BleManager.scan([], 5, true)
        .then(() => {
          console.log('Scanning...');
          setIsScanning(true);
        })
        .catch(error => {
          console.error('Error scanning:', error);
        });
    }
  };

  const toggleBluetooth = () => {
    if (bluetoothEnabled) {
      BleManager.disableBluetooth()
        .then(() => {
          console.log('Bluetooth turned off');
          setBluetoothEnabled(false);
        })
        .catch(error => {
          console.error('Error turning off Bluetooth:', error);
        });
    } else {
      BleManager.enableBluetooth()
        .then(() => {
          console.log('Bluetooth turned on');
          setBluetoothEnabled(true);
        })
        .catch(error => {
          console.error('Error turning on Bluetooth:', error);
        });
    }
  };

  const connectToPeripheral = peripheral => {
    BleManager.createBond(peripheral.id)
      .then(() => {
        peripheral.connected = true;
        peripherals.set(peripheral.id, peripheral);
        setConnectedDevices(Array.from(peripherals.values()));
        setDiscoveredDevices(Array.from(peripherals.values()));
        console.log('BLE device paired successfully');
      })
      .catch(() => {
        console.log('Failed to bond');
      });
  };

  const disconnectFromPeripheral = peripheral => {
    BleManager.removeBond(peripheral.id)
      .then(() => {
        peripheral.connected = false;
        peripherals.set(peripheral.id, peripheral);
        setConnectedDevices(Array.from(peripherals.values()));
        setDiscoveredDevices(Array.from(peripherals.values()));
        Alert.alert(`Disconnected from ${peripheral.name}`);
      })
      .catch(() => {
        console.log('Failed to remove the bond');
      });
  };

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    
    <SafeAreaView style={[backgroundStyle, styles.container]}>
<View style={styles.mainContainer}>
<View style={styles.mainContainer2}>


      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />


      <View style={{paddingHorizontal: 20}}>
        <Text
          style={[
            styles.title,styles.heading            
          ]}>
          Bluetooth Connection
        </Text>
        

        <View style={styles.mainContainner4}> 
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.scanButton}
          onPress={startScan}>
          <Text style={styles.scanButtonText}>
            {isScanning ? 'Scanning...' : 'Scan Bluetooth Devices'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.scanButton}
          onPress={toggleBluetooth}>
          <Text style={styles.scanButtonText}>
            {bluetoothEnabled ? 'Turn Off Bluetooth' : 'Turn On Bluetooth'}
          </Text>
        </TouchableOpacity>
        </View>


        <View style={styles.mainContainner3}> 
        <Text
          style={   styles.subtitle          
          }>
          Discovered Devices:
        </Text>
        {discoveredDevices.length > 0 ? (
          <FlatList
            data={discoveredDevices}
            renderItem={({item}) => (
              <DeviceList
                peripheral={item}
                connect={connectToPeripheral}
                disconnect={disconnectFromPeripheral}
              />
            )}
            keyExtractor={item => item.id}
          />
        ) : (
          <Text style={styles.noDevicesText}>No Bluetooth devices found</Text>
        )}

</View>


<View style={styles.mainContainner3}> 
        <Text
          style={styles.subtitle }>
          Connected Devices:
        </Text>
        {connectedDevices.length > 0 ? (
          <FlatList
            data={connectedDevices}
            renderItem={({item}) => (
              <DeviceList
                peripheral={item}
                connect={connectToPeripheral}
                disconnect={disconnectFromPeripheral}
              />
            )}
            keyExtractor={item => item.id}
          />
        ) : ( 
          <Text style={styles.noDevicesText}>No connected devices</Text>
        )}
 </View>

      </View>         
      </View>


      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <View style={styles.btn}>
            <Icon name="home" size={30} color="white" />
          </View>
        </TouchableOpacity> 


      </View>
        </SafeAreaView>
  );
};

export default App;

const windowHeight = Dimensions.get('window').height;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight,
    paddingHorizontal: 10,
  },
  scrollContainer: {
    padding: 16,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
  subtitle: {
    color: '#3AB0FF',   
    fontSize: 20,
    marginBottom: 10,
    marginTop: 20,
    fontWeight: 'bold',
  },
  scanButton: {
    width: 250,
    backgroundColor: '#3AB0FF',
    borderRadius: 100,
    marginVertical: 16,
    paddingVertical: 10,
  },
  scanButtonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  noDevicesText: {   
   color: '#ffffff',
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },
  deviceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  deviceItem: {
    marginBottom: 10,
  },
  deviceName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  deviceInfo: {
    fontSize: 14,
  },
  deviceButton: {
    backgroundColor: '#2196F3',
    padding: 8,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 20,
  },


mainContainer:{
  flex: 1,
  backgroundColor: '#272829',
  alignItems: 'center',
  justifyContent: 'center',
  
},
heading: {
  paddingTop: 10,
  color: '#FFFFFF',
  fontWeight: 'bold',
  fontSize: 26,
  
},
mainContainer2: {
  height: '85%',
  width: '90%',
 backgroundColor: '#000000',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 20,
 padding: 20,
 
},



mainContainner3:{
  width:250,
    flex: 1,
    backgroundColor: 'transparent',
    borderColor: '#3AB0FF',
    alignItems: 'center',
    borderWidth: 1,      
    borderRadius: 20,
    padding:10,
    margin:20,},
    
    mainContainner4:{
      width:250,
        flex: 1,
        backgroundColor: 'transparent',
        borderColor: '#3AB0FF',
        alignItems: 'center',        
        borderRadius: 20,
        padding:10,
        margin:20,
        
      }, 
      
      btn: {
        backgroundColor: '#2CB3FF',
        marginTop: 10,
        marginBottom:10,
        borderRadius: 30,
        color: 'white',
        width: 60,
        height:60,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'white'
          }, 



});
