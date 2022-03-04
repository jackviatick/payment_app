import {NativeModules} from 'react-native';

const {BmsModule} = NativeModules;

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

export const initBmsSdk = async () => {
  await initCtrl();
  const success = await initSdk();
  return success;
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
