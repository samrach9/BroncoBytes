import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import useFonts from './hooks/useFonts';

//Navigation screens
import LoadingScreen from './screens/loading';
import Home from './screens/home';
import ChooseHall from './screens/chooseHall';
import Benson from './screens/benson';
import FreshBytes from './screens/freshbytes';
import AllReviews from './screens/allReviews';
import LeaveReview from './screens/leaveReview';

export default function App() {

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
