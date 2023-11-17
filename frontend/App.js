import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useCallback, useEffect, createContext, useContext } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as SecureStore from 'expo-secure-store';
import useFonts from './hooks/useFonts';
import getAllFood from './api/getAllFood';

//Navigation screens
import Loading from './screens/loading';
import Home from './screens/home';
import Navigation from './screens/navigation';
import ChooseHall from './screens/chooseHall';
import LeaveReview from './screens/leaveReview';
import BensonRestaurants from './screens/bensonRestaurants';
import Login from './screens/login';
import SignUp from './screens/signup';
import Friends from './screens/friends';
import FoodsPage from './screens/FoodsPage';
import ReviewsPage from './screens/ReviewsPage';
import CreateFood from './screens/createFood';
import AccountPage from './screens/accountPage';
import AddingFriends from './screens/addingFriends';

SplashScreen.preventAutoHideAsync();

export const FoodContext = createContext();
export const UserContext = createContext();

export default function App() {

  const [appIsReady, setAppIsReady] = useState(false);
  const [allFood, setAllFood] = useState(null);
  const [user, setUser] = useState({});
  const [initialRouteName, setInitialRouteName] = useState('Navigation');
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    async function prepare() {
      try {
        await useFonts();
        setAllFood(await getAllFood());
        // Uncomment the following line to force a login on each app start
        // await SecureStore.deleteItemAsync("user");
        const tempUserString = await SecureStore.getItemAsync("user");
        const tempUser = await JSON.parse(tempUserString);
        console.log(tempUser)
        if (tempUser && 'userId' in tempUser) {
          setUser(tempUser);
        } else {
          setInitialRouteName('Login');
        }
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
      <UserContext.Provider value={{ user: user, setUser: setUser }}>
        <FoodContext.Provider value={{ allFood: allFood, setAllFood: setAllFood }}>
          <NavigationContainer >
            <Stack.Navigator initialRouteName={initialRouteName}>
              <Stack.Screen name='Loading' component={Loading} />
              <Stack.Screen name='Home' component={Home} />
              <Stack.Screen name='Choose Hall' component={ChooseHall} />
              <Stack.Screen name='Friends' component={Friends} />
              <Stack.Screen name='Leave Review' component={LeaveReview} />
              <Stack.Screen name='Benson Restaurants' component={BensonRestaurants} />
              <Stack.Screen name='Login' component={Login} />
              <Stack.Screen name='Sign Up' component={SignUp} />
              <Stack.Screen name='Navigation' component={Navigation} />
              <Stack.Screen name='Foods Page' component={FoodsPage} />
              <Stack.Screen name='Reviews Page' component={ReviewsPage} />
              <Stack.Screen name='Create Food' component={CreateFood} />
              <Stack.Screen name='Account Profile' component={AccountProfile} />
              <Stack.Screen name='Adding Friends' component={AddingFriends} />
            </Stack.Navigator>
          </NavigationContainer>
        </FoodContext.Provider>
      </UserContext.Provider>
    </View>
  );
};
