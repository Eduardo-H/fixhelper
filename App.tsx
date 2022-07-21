import React from 'react';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';
import { Loading } from './src/components/Loading';

import { THEME } from './src/styles/theme';
import { AlertProvider } from './src/hooks/useAlert';
import { Alert } from './src/components/Alert';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  });

  return (
    <AlertProvider>
      <NativeBaseProvider theme={THEME}>
        <Alert />
        
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        
        { fontsLoaded ? <Routes /> : <Loading /> }
    </NativeBaseProvider>
    </AlertProvider>
  );
}
