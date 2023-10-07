import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { View, useState, useCallback, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import useFonts from './hooks/useFonts';

//Navigation screens
import LoadingScreen from './screens/loading';
import Home from './screens/home';
import ChooseHall from './screens/chooseHall';
import Benson from './screens/benson';
import FreshBytes from './screens/freshbytes';
import AllReviews from './screens/allReviews';
import LeaveReview from './screens/leaveReview';

SplashScreen.preventAutoHideAsync();

export default function App() {
  /*

  const [IsReady, SetIsReady] = useState(false);

  const LoadFonts = async () => {
    await useFonts();
  };

  const Stack = createNativeStackNavigator();

  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => { }}
      />
    );
  }
  */

  const [appIsReady, setAppIsReady] = useState(false);
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await useFonts();
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='LoadingScreen' component={LoadingScreen} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Choose Hall' component={ChooseHall} />
        <Stack.Screen name='Benson' component={Benson} />
        <Stack.Screen name='Fresh Bytes' component={FreshBytes} />
        <Stack.Screen name='All Reviews' component={AllReviews} />
        <Stack.Screen name='Leave Review' component={LeaveReview} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
