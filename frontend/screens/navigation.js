import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Button, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FoodContext } from '../App';
import { TopBar } from '../components/topBar';
import { Footer } from '../components/footer';

// options shift f
export default function Navigation() {

    const navigation = useNavigation();
    const { allFood, setAllFood } = useContext(FoodContext);

    return (
        // Container
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.chooseHallContainer}>
                    <Text style={styles.chooseHallText}>Bronco Bytes</Text>
                    <Image
                        source={require('../assets/BroncoBytesIcon.png')}
                        style={styles.icon} />
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button}
                        onPress={() => navigation.navigate('Benson Restaurants')}>
                        <Text style={styles.buttonText}>My Profile</Text>
                    </Pressable>

                    <Pressable style={styles.button}
                        onPress={() => navigation.navigate('Choose Hall')}>
                        <Text style={styles.buttonText}>Browse Reviews</Text>
                    </Pressable>

                    <Pressable style={styles.button}
                        onPress={() => navigation.navigate('Fresh Bytes')}>
                        <Text style={styles.buttonText}>View Friends Feed</Text>
                    </Pressable>
                </View>
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