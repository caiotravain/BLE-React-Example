/* eslint-disable no-bitwise */
import { useMemo, useState, useEffect } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import {
  BleError,
  BleManager,
  Characteristic,
  Device,
} from "react-native-ble-plx";

import * as ExpoDevice from "expo-device";

import base64 from "react-native-base64";
// use hc-10 ble module uuid sevice
// const HEART_RATE_UUID = "0000ffe0-0000-1000-8000-00805f9b34fb";
// const HEART_RATE_CHARACTERISTIC_read = "0000ffe1-0000-1000-8000-00805f9b34fb";
const HEART_RATE_UUID = "0000ffe0-0000-1000-8000-00805f9b34fb";
const HEART_RATE_CHARACTERISTIC_read = "0000ffe1-0000-1000-8000-00805f9b34fb";
const HEART_RATE_CHARACTERISTIC_write = "0000ffe2-0000-1000-8000-00805f9b34fb"; 

interface BluetoothLowEnergyApi {
  requestPermissions(): Promise<boolean>;
  scanForPeripherals(): void;
  connectToDevice: (deviceId: Device) => Promise<void>;
  disconnectFromDevice: () => void;
  connectedDevice: Device | null;
  allDevices: Device[];
  heartRate: number;
  lista: Array<string>;
}


function useBLE(): BluetoothLowEnergyApi {
  const bleManager = useMemo(() => new BleManager(), []);
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [heartRate, setHeartRate] = useState<number>(0);
  const [lista, setLista] = useState<Array<string>>([]);
  useEffect(() => {
    console.log(lista);
  }, [lista]);

  const requestAndroid31Permissions = async () => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
    const bluetoothConnectPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );

    return (
      bluetoothScanPermission === "granted" &&
      bluetoothConnectPermission === "granted" &&
      fineLocationPermission === "granted"
    );
  };

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "Bluetooth Low Energy requires Location",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const isAndroid31PermissionsGranted =
          await requestAndroid31Permissions();

        return isAndroid31PermissionsGranted;
      }
    } else {
      return true;
    }
  };

  const isDuplicteDevice = (devices: Device[], nextDevice: Device) =>
    devices.findIndex((device) => nextDevice.id === device.id) > -1;

  const scanForPeripherals = () =>
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        
        console.log(error);
      }
      if (device && device.name !== null ) { 


        setAllDevices((prevState: Device[]) => {
          if (!isDuplicteDevice(prevState, device)) {
            return [...prevState, device];
          }
          return prevState;
        });
      }
    });

  const connectToDevice = async (device: Device) => {
    try {
      const deviceConnection = await bleManager.connectToDevice(device.id);
      setConnectedDevice(deviceConnection);
      await deviceConnection.discoverAllServicesAndCharacteristics();
      bleManager.stopDeviceScan();
      startStreamingData(deviceConnection);
    } catch (e) {
      console.log("FAILED TO CONNECT", e);
    }
  };

  const disconnectFromDevice = () => {
    if (connectedDevice) {
      bleManager.cancelDeviceConnection(connectedDevice.id);
      setConnectedDevice(null);
      setHeartRate(0);
    }
  
  };

  const onHeartRateUpdate = (
    error: BleError | null,
    characteristic: Characteristic | null,
    device: Device | null
  ) => {
    console.log("Heart Rate Update");
    if (error) {
      console.log(error);
      return -1;
    } else if (!characteristic?.value) {
      console.log("No Data was recieved");
      return -1;
    }
    console.log("Raw" +characteristic.value);

    const rawData = base64.decode(characteristic.value);
    let innerHeartRate: number = -1;

    const firstBitValue: number = Number(rawData) & 0x01;
    
    //read all data
    if (rawData.includes("B") && rawData.includes("C") && rawData.includes("D") && rawData.includes("E")){
      setLista((prevLista) => [...prevLista, rawData])
      

      device?.writeCharacteristicWithResponseForService(
        HEART_RATE_UUID,
        HEART_RATE_CHARACTERISTIC_write,
        base64.encode("C")
      )
      .then((characteristic) => {
        console.log(characteristic.value);
      })
      .catch((error) => {
        console.log(error);
      })
    }
    


    setHeartRate(innerHeartRate);
  };

    const startStreamingData = async (device: Device) => {
    console.log("device" + device);
    await device?.discoverAllServicesAndCharacteristics();
    //console.log( await device?.discoverAllServicesAndCharacteristics());
    
    device?.monitorCharacteristicForService(
      HEART_RATE_UUID,
      HEART_RATE_CHARACTERISTIC_read,
      (error, characteristic) =>
        onHeartRateUpdate(error, characteristic, device),
      );
      //send data bluetooth

  };

  return {
    scanForPeripherals,
    requestPermissions,
    connectToDevice,
    allDevices,
    connectedDevice,
    disconnectFromDevice,
    heartRate,
    lista,
  };
}

export default useBLE;
