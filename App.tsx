import React, {useEffect} from 'react';
import {AppNavigator} from './app/navigators';
import {initBmsSdk, startBmsService} from './app/services/NativeModule';
const App = () => {
  useEffect(() => {
    console.log('RN init sdk');
    initBmsSdk();
  }, []);
  return <AppNavigator />;
};

export default App;
