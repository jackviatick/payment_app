import React, {useEffect} from 'react';
import {AppNavigator} from './app/navigators';
import {initBmsSdk} from 'services/NativeModule';
import {NativeBaseProvider} from 'native-base';
const App = () => {
  useEffect(() => {
    console.log('RN init sdk');
    initBmsSdk();
  }, []);
  return (
    <NativeBaseProvider>
      <AppNavigator />
    </NativeBaseProvider>
  );
};

export default App;
