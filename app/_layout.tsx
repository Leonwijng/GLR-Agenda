import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import SplashScreenComponent from '../components/SplashScreen';
import "../global.css";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [isAppReady, setIsAppReady] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
      setIsAppReady(true);
      
      // Show custom splash screen for 2 seconds
      setTimeout(() => {
        setShowLoadingScreen(false);
      }, 2000);
    }
  }, [fontsLoaded]);

  if (!isAppReady || showLoadingScreen) {
    return (
      <>
        <StatusBar style="light" backgroundColor="#000000" />
        <SplashScreenComponent />
      </>
    );
  }

  return (
    <>
      <StatusBar style="light" backgroundColor="#000000" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#000000' },
          animation: 'fade',
        }}
      />
    </>
  );
}


