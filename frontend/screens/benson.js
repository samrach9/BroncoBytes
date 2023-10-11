import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, Pressable, StatusBar, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FoodContext } from '../App';
import { Footer } from '../components/footer';
import { TopBar } from '../components/topBar';

export default function Benson() {

    const navigation = useNavigation();
    const {allFood, setAllFood} = useContext(FoodContext);

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <TopBar text={"Benson"}/>
                <ScrollView>
                    <View style={styles.content}>
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
                    <View style={styles.content}>
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
                    <View style={styles.content}>
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
                    <View style={styles.content}>
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
                </ScrollView>
            </View>
            <Footer
                leftButtonText={"Back"}
                leftButtonPress={() => navigation.navigate('Choose Hall')}
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
    ratingCard: {
        height: 400,
        width: 300,
        backgroundColor: 'white',
        margin: 50,
        marginBottom: 0,
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