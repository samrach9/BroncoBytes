import React from 'react';
import { StyleSheet, Text, View, Image, Pressable, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

export default function Benson() {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.topBar}>
                    <Text style={styles.topBarText}>Benson</Text>
                </View>
                <View style={styles.content}>
                    <View style={styles.ratingCard}>
                        <View style={styles.cardTitleContainer}>
                            <Text style={styles.cardTitle}>Benson: Poke Bowl</Text>
                        </View>
                        <View style={styles.foodImageContainer}>
                            <Image source={require('./assets/tempFoodImage.png')}
                                style={styles.foodImage} />
                        </View>
                        <View style={styles.starContainer}>
                            <Text style={styles.ratingText}>Rating: </Text>
                            <Image
                                source={require('./assets/Star.png')
                                } />
                            <Image
                                source={require('./assets/Star.png')
                                } />
                            <Image
                                source={require('./assets/Star.png')
                                } />
                            <Image
                                source={require('./assets/Star.png')
                                } />
                            <Image
                                source={require('./assets/EmptyStar.png')
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
            </View>
            <View style={styles.footer}>
                <Pressable style={styles.backButtonContainer}
                    onPress={() => navigation.navigate('Choose Hall')}>
                    <View style={styles.backButtonText}>
                        <Text style={styles.buttonText}>Back</Text>
                    </View>
                </Pressable>
                <View style={styles.middleIconContainer}>
                    <View style={styles.leftLine}>
                    </View>
                    <Image
                        source={require('../assets/BroncoBytesIcon.png')}
                        style={styles.icon} />
                    <View style={styles.rightLine}>

                    </View>
                </View>
                <Pressable style={styles.reviewButtonContainer}
                    onPress={() => navigation.navigate('Leave Review')}>
                    <View style={styles.reviewButtonText}>
                        <Text style={styles.buttonText}>Review</Text>
                    </View>
                </Pressable>
            </View>
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
    topBar: {
        backgroundColor: 'white',
    },
    topBarText: {
        color: '#B30738',
        fontFamily: 'Bungee',
        fontSize: 36,
        padding: 20,
    },
    footer: {
        backgroundColor: 'white',
        height: 75,
        flexDirection: 'row',
    },
    backButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    middleIconContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    reviewButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: 'Bungee',
        fontSize: 20,
        color: '#B30738',
    },
    icon: {
        width: 40,
        height: 40,
    },
    leftLine: {
        borderWidth: 2,
        borderColor: '#B30738',
        height: 36,
    },
    rightLine: {
        borderWidth: 2,
        borderColor: '#B30738',
        height: 36,
    },
    content: {
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'black',
    },
    ratingCard: {
        height: 400,
        width: 300,
        backgroundColor: 'white',
        margin: 50,
        padding: 10,
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
    safeAreaView: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
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
    }
});