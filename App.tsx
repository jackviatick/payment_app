import React, {useEffect} from 'react';
import {AppNavigator} from './app/navigators';
import {NativeBaseProvider, StatusBar} from 'native-base';
const App = () => {
  useEffect(() => {}, []);
  return (
    <NativeBaseProvider>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
    </NativeBaseProvider>
  );
};

export default App;
