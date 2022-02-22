import {NativeModules} from 'react-native';

const {BmsModule} = NativeModules;

console.log('bms module ---------', BmsModule);

const {initCtrl, initSdk} = BmsModule;

export const initModule = async () => {
  await initCtrl();
};

export const initBluetoothService = async () => {
  const success = await initSdk();
  console.log('is success', success);
  return success;
};
