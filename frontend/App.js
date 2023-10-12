import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useCallback, useEffect, createContext } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import useFonts from './hooks/useFonts';
import getAllFood from './api/getAllFood';

//Navigation screens
import LoadingScreen from './screens/loading';
import Home from './screens/home';
import ChooseHall from './screens/chooseHall';
import Benson from './screens/benson';
import FreshBytes from './screens/freshbytes';
import AllReviews from './screens/allReviews';
import LeaveReview from './screens/leaveReview';

SplashScreen.preventAutoHideAsync();

export const FoodContext = createContext();

export default function App() {

  const [appIsReady, setAppIsReady] = useState(false);
  const [allFood, setAllFood] = useState(null);
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    async function prepare() {
      try {
        await useFonts();
        setAllFood(await getAllFood());
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ height: '100%', width: '100%' }} onLayout={onLayoutRootView}>
      <FoodContext.Provider value={{ allFood: allFood, setAllFood: setAllFood }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name='LoadingScreen' component={LoadingScreen} />
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='Choose Hall' component={ChooseHall} />
            <Stack.Screen name='Benson' component={Benson} />
            <Stack.Screen name='Fresh Bytes' component={FreshBytes} />
            <Stack.Screen name='All Reviews' component={AllReviews} />
            <Stack.Screen name='Leave Review' component={LeaveReview} />
          </Stack.Navigator>
        </NavigationContainer>
      </FoodContext.Provider>
    </View>
  );
};
