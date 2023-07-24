import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Button,
} from "react-native";
import DeviceModal from "./DeviceConnectionModal";
import { PulseIndicator } from "./PulseIndicator";
import useBLE from "./useBLE";
import {Corrida} from "./Corrida";


const App = () => {
  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    connectedDevice,
    heartRate,
    disconnectFromDevice,
    lista,
  } = useBLE();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  

  const scanForDevices = async () => {
    const isPermissionsEnabled = await requestPermissions();
    if (isPermissionsEnabled) {
      
      scanForPeripherals();
    }
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const openModal = async () => {
    scanForDevices();
    setIsModalVisible(true);
  };



  var corrida_arr = lista.map((corre,index) => (
    <Corrida indicador={corre} key={ index.toString()}/>
  ));




  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.bikeio}>
                    BIKE.IO
                  </Text>
      <View style={styles.heartRateTitleWrapper}>
        {connectedDevice ? (
          <>
            {/* <PulseIndicator /> */}
            {lista.length != 0 ? (
                  <SafeAreaView >
                    <ScrollView style={styles.corre}>
                        {corrida_arr}
                    </ScrollView>
                  </SafeAreaView>
                ) : (
                  <Text style={styles.bikeio}>
                    BIKE.IO
                  </Text>)
            }
            
          </>
            
                  ) : (
          <Text style={styles.heartRateTitleText}>
            Please Connect to the Bluetooth Device
          </Text>
        )}
      </View>
      <TouchableOpacity
        onPress={connectedDevice ? disconnectFromDevice : openModal}
        style={styles.ctaButton}
      >
        <Text style={styles.ctaButtonText}>
          {connectedDevice ? "Disconnect" : "Connect"}
        </Text>
      </TouchableOpacity>
      <DeviceModal
        closeModal={hideModal}
        visible={isModalVisible}
        connectToPeripheral={connectToDevice}
        devices={allDevices}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  heartRateTitleWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heartRateTitleText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 20,
    color: "black",
  },
  heartRateText: {
    fontSize: 25,
    marginTop: 15,
  },
  ctaButton: {
    backgroundColor: "#FF6060",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  corre:{
    display: "flex",
    flexDirection: "column",

  },
  bikeio:{
    fontSize: 50,
    fontFamily: "Roboto",
    color: "black",
    fontWeight: "bold",
    fontStyle: "italic",
    textAlign: "center",
  }
});

export default App;
