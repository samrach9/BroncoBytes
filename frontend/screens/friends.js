import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Button, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FoodContext } from '../App';
import { TopBar } from '../components/topBar';
import { Footer } from '../components/footer';

export default function Friends() {

    const navigation = useNavigation();
    const { allFood, setAllFood } = useContext(FoodContext);

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <TopBar text={"Friends"} />
                <ScrollView>
                    <View style={styles.content}>
                        <View style={styles.miscButtons}>
                            <Text style={styles.miscText}>Newest</Text>
                            <Text>Add Friends Button</Text>
                        </View>
                        <View style={styles.friendIconsContainer}>
                            <View style={styles.friendIconRowContainer}>
                                <View style={styles.friendIcon}>
                                    <View style={styles.circle}>

                                    </View>
                                    <Text style={styles.friendText}>Post Malone</Text>
                                </View>
                                <View style={styles.friendIcon}>
                                    <View style={styles.circle}>

                                    </View>
                                    <Text style={styles.friendText}>Doja Cat</Text>
                                </View>
                            </View>
                            <View style={styles.friendIconRowContainer}>
                                <View style={styles.friendIcon}>
                                    <View style={styles.circle}>

                                    </View>
                                    <Text style={styles.friendText}>Post Malone</Text>
                                </View>
                                <View style={styles.friendIcon}>
                                    <View style={styles.circle}>

                                    </View>
                                    <Text style={styles.friendText}>Doja Cat</Text>
                                </View>
                            </View>
                        </View>
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
    miscButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 15,
    },
    friendIconsHorizontalContainer: {
        justifyContent: 'space-between',
        margin: 25,
        borderWidth: 2,
        borderColor: 'black',
    },
    friendIconRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 25,
    },
    friendIcon: {
        alignItems: 'center',
    },
    circle: {
        borderRadius: '75%',
        borderColor: 'black',
        borderWidth: 2,
        width: 150,
        height: 150,
        backgroundColor: '#D9D9D9',
        marginBottom: 5,
    },
    friendText: {
        color: 'white',
        fontFamily: 'Bungee',
        fontSize: 20,
    },
    miscText: {
        color: 'white',
        fontFamily: 'Bungee',
        fontSize: 15,
    },
});