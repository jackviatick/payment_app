import {NativeModules} from 'react-native';

const {BmsModule} = NativeModules;

console.log('NativeModules  ---------', NativeModules);
console.log('bms module ---------', BmsModule);

const {
  initCtrl,
  initSdk,
  isSdkInited,
  stopSdk,
  startService,
  isServiceStarted,
  testNotification,
} = BmsModule;

export const stopModule = async () => {
  await stopSdk();
};

export const initModuleCtrl = async () => {
  await initCtrl();
};

export const isInited = async () => {
  return await isSdkInited();
};

export const startBmsService = async () => {
  return await startService();
};

export const isBmsServiceStarted = async () => {
  return await isServiceStarted();
};

export const testNoti = async () => {
  return await testNotification();
};

export const initBmsCustomer = async (
  id: string,
  phone: string,
  email: string,
) => {
  console.log('init customer native module');
  await stopSdk();
  await initSdk(id, phone, email);
};
