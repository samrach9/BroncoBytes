import React, { useContext } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FoodContext } from '../App';
import FoodCard from '../components/foodCard';

export default function Home() {

    const navigation = useNavigation();
    const { allFood, setAllFood } = useContext(FoodContext);

    return (
        <View style={styles.container}>
            <View style={styles.biteOTD}>
                <Text style={styles.biteText}>Byte of the Day</Text>
            </View>
            
            <FoodCard key={allFood[0].foodId} food={allFood[0]} />

            <View style={styles.buttonsContainer}>

                <Pressable style={styles.button}
                    onPress={() => navigation.navigate('Choose Hall')}>
                    <Text style={styles.buttonText}>Browse Reviews</Text>
                </Pressable>
                <Pressable style={styles.button}
                    onPress={() => navigation.navigate('Leave Review')}>
                    <Text style={styles.buttonText}>Leave A Review</Text>
                </Pressable>

            </View>
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
    loadText: {
        fontFamily: 'Bungee',
        color: "white",
        fontSize: 40,
    },
    icon: {
        width: 100,
        height: 100,
        margin: 10,
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
    biteText: {
        fontFamily: 'Bungee',
        fontSize: 32,
        color: 'white',
    },
    foodCardContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    foodImageContainer: {
        borderColor: 'black',
        borderWidth: 2,
        flex: 9,
        alignItems: 'center',
        marginBottom: 5,
    },
    starContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    notesContainer: {
        flex: 2.5,
    },
    submittedContainer: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    submittedText: {
        fontFamily: 'Bungee',
        fontSize: 8,
    },
    foodImage: {
        width: '100%',
        height: '100%',
        aspectRatio: 1,
    },
    cardTitleContainer: {
        marginBottom: 10,
    },
    cardTitle: {
        fontFamily: 'Bungee',
    },
    ratingText: {
        fontFamily: 'Bungee',
    },
    notesText: {
        fontFamily: 'Bungee',
        fontSize: 10
    },
});


