import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, Pressable, StatusBar, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FoodContext } from '../App';
import { Footer } from '../components/footer';
import { TopBar } from '../components/topBar';
import { bensonRestaurants } from '../enum/bensonRestaurants';

export default function BensonRestaurants() {

    const navigation = useNavigation();
    const {allFood, setAllFood} = useContext(FoodContext);

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <TopBar text={"Benson"}/>
                <ScrollView>
                    <View style={styles.buttonContainer}>
                        {
                            Object.keys(bensonRestaurants).map((key) => {
                                return (
                                    <Pressable style={styles.button} key={key}
                                        onPress={() => navigation.navigate('Foods Page', {restaurantKey: key, restaurantName: bensonRestaurants[key]})}>
                                        <Text style={styles.buttonText}>{bensonRestaurants[key]}</Text>
                                    </Pressable>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </View>
            <Footer
                leftButtonText={"Back"}
                leftButtonPress={() => navigation.navigate('Choose Hall')}
                iconButtonPress={() => navigation.navigate('Navigation')}
                rightButtonText={"Review"}
                rightButtonPress={() => navigation.navigate('Leave Review')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B30738',
    },
    contentContainer: {
        flex: 1,
    },
    content: {
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 20,
        margin: 5,
        justifyContent: 'stretch',
        alignItems: 'stretch',
        width: 305,
    },
    buttonText: {
        fontFamily: 'Bungee',
        fontSize: 25,
        color: '#B30738',
        textAlign: 'center',
        padding: 10,
    },
    buttonContainer: {
        alignContent: 'center',
        alignItems: 'center',
    }
});

