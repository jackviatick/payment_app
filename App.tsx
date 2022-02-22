import React, {useEffect} from 'react';
import {AppNavigator} from './app/navigators';
import {initModule, initBluetoothService} from './app/services/NativeModule';
const App = () => {
  const initApp = async () => {
    await initModule();
    await initBluetoothService();
  };

  useEffect(() => {
    console.log('init sdk');
    initApp();
  }, []);
  return <AppNavigator />;
};

export default App;
