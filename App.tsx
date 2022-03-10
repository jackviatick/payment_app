import React, {useEffect} from 'react';
import {AppNavigator} from './app/navigators';
import {initBmsSdk} from 'services/NativeModule';
import {NativeBaseProvider, StatusBar} from 'native-base';
const App = () => {
  useEffect(() => {
    console.log('RN init sdk');
    initBmsSdk();
  }, []);
  return (
    <NativeBaseProvider>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
    </NativeBaseProvider>
  );
};

export default App;
