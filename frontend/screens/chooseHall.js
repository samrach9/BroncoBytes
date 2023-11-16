import React, { useContext } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Footer } from '../components/footer';
import { UserContext } from '../App';
import { FoodContext } from '../App';
import FoodCard from '../components/foodCard';
import { BigRectangleButton } from '../components/bigRectangleButton';
import { SmallRectangleButton } from '../components/smallRectangleButton';

export default function ChooseHall() {

    const navigation = useNavigation();
    const { user, setUser } = useContext(UserContext);
    const { allFood, setAllFood } = useContext(FoodContext);

    const navigateToFreshBytes = () => {
        navigation.navigate('Foods Page', { restaurantKey: "FreshBytes", restaurantName: "Fresh Bytes" })
    }

    return (
        // Container
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.chooseHallContainer}>
                    <Text style={styles.chooseHallText}>Choose A</Text>
                    <Text style={styles.chooseHallText}>Dining Hall</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <BigRectangleButton text='Benson' onClick={() => navigation.navigate('Benson Restaurants')} />
                    <BigRectangleButton text='Fresh Bytes' onClick={() => navigation.navigate('Foods Page', { restaurantKey: "FreshBytes", restaurantName: "Fresh Bytes" })} />
                    <SmallRectangleButton text='All Reviews' onClick={() => navigation.navigate('Foods Page', { restaurantName: "All Reviews" })} />
                    
                </View>
                {
                    user.admin &&
                    <SmallRectangleButton text='Create Food' onClick={() => navigation.navigate('Create Food')} />
                }
            </View>
            <Footer
                leftButtonText={"Back"}
                leftButtonPress={() => navigation.pop()}
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    chooseHallContainer: {
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadText: {
        fontFamily: 'Bungee',
        color: "#B30738",
        fontSize: 40,
    },
    icon: {
        width: 100,
        height: 100,
        margin: 10,
    },
    chooseHallText: {
        fontFamily: 'Bungee',
        fontSize: 35,
        color: 'white',
        textAlign: 'center',
    },
    buttonContainer: {
        alignContent: 'center',
        alignItems: 'center',
    },
});
