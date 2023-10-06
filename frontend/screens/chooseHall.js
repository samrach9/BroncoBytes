import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ChooseHall() {

    const navigation = useNavigation();

    return (
        // Container
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.chooseHallContainer}>
                    <Text style={styles.chooseHallText}>Choose A</Text>
                    <Text style={styles.chooseHallText}>Dining Hall</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button}
                        onPress={() => navigation.navigate('Benson')}>
                        <Text style={styles.buttonText}>Benson</Text>
                    </Pressable>

                    <Pressable style={styles.button}
                        onPress={() => navigation.navigate('Fresh Bytes')}>
                        <Text style={styles.buttonText}>Fresh Bytes</Text>
                    </Pressable>
                </View>
                <Pressable style={styles.allReviewsButton}
                    onPress={() => navigation.navigate('All Reviews')}>
                    <Text style={styles.allReviewsText}>All Reviews</Text>
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
    contentContainer: {
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
    allReviewsButton: {
        width: 202,
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 20,
        margin: 5,
    },
    allReviewsText: {
        fontFamily: 'Bungee',
        fontSize: 20,
        color: '#B30738',
        textAlign: 'center',
        padding: 10,
    }
});