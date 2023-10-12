import React from 'react';
import { StyleSheet, Text, View, Image, Pressable, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.biteOTD}>
                <Text style={styles.biteText}>Bite of the Day</Text>
            </View>
            <View style={styles.foodCardContainer}>
                <View style={styles.ratingCard}>
                    <View style={styles.cardTitleContainer}>
                        <Text style={styles.cardTitle}>Benson: Poke Bowl</Text>
                    </View>
                    <View style={styles.foodImageContainer}>
                        <Image source={require('../assets/tempFoodImage.png')}
                            style={styles.foodImage} />
                    </View>
                    <View style={styles.starContainer}>
                        <Text style={styles.ratingText}>Rating: </Text>
                        <Image
                            source={require('../assets/Star.png')
                            } />
                        <Image
                            source={require('../assets/Star.png')
                            } />
                        <Image
                            source={require('../assets/Star.png')
                            } />
                        <Image
                            source={require('../assets/Star.png')
                            } />
                        <Image
                            source={require('../assets/EmptyStar.png')
                            } />
                    </View>
                    <View style={styles.notesContainer}>
                        <Text style={styles.notesText}>Notes: blah blahbobhl ablhbaabl hablhb ahl ablhbaabl hablhb ahlablhbaabl hablhb ahlablhbaabl hablhb ahlablhbaabl hablhb ahlablhbaabl hablhb ahlablhbaabl hablhb ahlablhbaabl hablhb ahlablhbaabl hablhb ahlablhbaabl hablhb ahlablhbaabl hablhb ahlablhbaabl hablhb ahl</Text>
                    </View>
                    <View style={styles.submittedContainer}>
                        <Text style={styles.submittedText}>- Submitted By: Today, 11:15AM -</Text>
                    </View>
                </View>
            </View>
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
        backgroundColor: 'white',
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
    button: {
        backgroundColor: '#B30738',
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
        color: 'white',
        textAlign: 'center',
        padding: 10,
    },
    biteText: {
        fontFamily: 'Bungee',
        fontSize: 32,
        color: '#B30738',
    },
    foodCardContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    ratingCard: {
        height: 400,
        width: 300,
        backgroundColor: 'white',
        margin: 50,
        marginTop: 5,
        padding: 10,
        borderWidth: 2,
        borderColor: 'black',
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


