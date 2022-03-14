import React, {useEffect} from 'react';
import {AppNavigator} from './app/navigators';
import {NativeBaseProvider, StatusBar} from 'native-base';
import {initModuleCtrl} from 'services/NativeModule';
const App = () => {
  useEffect(() => {
    initModuleCtrl();
  }, []);
  return (
    <NativeBaseProvider>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
    </NativeBaseProvider>
  );
};

export default App;
