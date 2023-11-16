import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, Pressable, StatusBar, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FoodContext } from '../App';
import { Footer } from '../components/footer';
import { TopBar } from '../components/topBar';
import { bensonRestaurants } from '../enum/bensonRestaurants';
import { BigRectangleButton } from '../components/bigRectangleButton';
import { SquareTile } from '../components/arrowButton';

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
                                    <BigRectangleButton text={bensonRestaurants[key]} onClick={() => navigation.navigate('Foods Page', {restaurantKey: key, restaurantName: bensonRestaurants[key]})} />
                                )
                            })
                        }
                    </View>
                </ScrollView>
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
    },
    contentContainer: {
        flex: 1,
    },
    content: {
        alignItems: 'center',
    },
    buttonContainer: {
        alignContent: 'center',
        alignItems: 'center',
        columns: 2 
    }
});

