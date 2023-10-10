import * as Font from "expo-font";
 
export default useFonts = async () =>
  await Font.loadAsync({
    'Bungee': require('../assets/fonts/Bungee-Regular.ttf'),
  });