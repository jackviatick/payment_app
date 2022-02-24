import {NativeModules} from 'react-native';

const {BmsModule} = NativeModules;

console.log('bms module ---------', BmsModule);

const {initCtrl, initSdk, isSdkInited, stopSdk, startBmsService} = BmsModule;

export const initModule = async () => {
  await initCtrl();
};

export const stopModule = async () => {
  await stopSdk();
};

export const initBluetoothService = async () => {
  const success = await initSdk();
  return success;
};

export const isInited = async () => {
  return await isSdkInited();
};

export const startService = async () => {
  return await startBmsService();
};
