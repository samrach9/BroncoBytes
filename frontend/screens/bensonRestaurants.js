import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, Pressable, StatusBar, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FoodContext } from '../App';
import { Footer } from '../components/footer';
import { TopBar } from '../components/topBar';

export default function BensonRestaurants() {

    const navigation = useNavigation();
    const {allFood, setAllFood} = useContext(FoodContext);

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <TopBar text={"Benson"}/>
                <ScrollView>
                    <View style={styles.buttonContainer}>
            
                        <Pressable style={styles.button}
                            onPress={() => navigation.navigate('Benson')}>
                            <Text style={styles.buttonText}>Mission Bakery</Text>
                        </Pressable>
            
                        <Pressable style={styles.button}
                            onPress={() => navigation.navigate('Benson')}>
                            <Text style={styles.buttonText}>La Parilla</Text>
                        </Pressable>

                        <Pressable style={styles.button}
                            onPress={() => navigation.navigate('Benson')}>
                            <Text style={styles.buttonText}>The Spice Market</Text>
                        </Pressable>
            
                        <Pressable style={styles.button}
                            onPress={() => navigation.navigate('Benson')}>
                            <Text style={styles.buttonText}>Trattoria</Text>
                        </Pressable>
            
                        <Pressable style={styles.button}
                            onPress={() => navigation.navigate('Benson')}>
                            <Text style={styles.buttonText}>The Global Grill</Text>
                        </Pressable>
            
                        <Pressable style={styles.button}
                            onPress={() => navigation.navigate('Benson')}>
                            <Text style={styles.buttonText}>The Slice</Text>
                        </Pressable>

                        <Pressable style={styles.button}
                            onPress={() => navigation.navigate('Benson')}>
                            <Text style={styles.buttonText}>The Fire Grill</Text>
                        </Pressable>

                        <Pressable style={styles.button}
                            onPress={() => navigation.navigate('Benson')}>
                            <Text style={styles.buttonText}>Simply Oasis</Text>
                        </Pressable>

                        <Pressable style={styles.button}
                            onPress={() => navigation.navigate('Benson')}>
                            <Text style={styles.buttonText}>The Chefs Table</Text>
                        </Pressable>
            
                        <Pressable style={styles.button}
                            onPress={() => navigation.navigate('Benson')}>
                            <Text style={styles.buttonText}>Sushi</Text>
                        </Pressable>
            
                        <Pressable style={styles.button}
                            onPress={() => navigation.navigate('Benson')}>
                            <Text style={styles.buttonText}>Acai</Text>
                        </Pressable>
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

