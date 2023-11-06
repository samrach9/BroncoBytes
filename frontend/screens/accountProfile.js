import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Button, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FoodContext } from '../App';
import { Footer } from '../components/footer';
import { TopBar } from '../components/topBar';
import { BigRectangleButton } from '../components/bigRectangleButton';
import { UserContext } from '../App';
import * as SecureStore from 'expo-secure-store';

// options shift f
export default function Navigation() {

    const navigation = useNavigation();
    const { allFood, setAllFood } = useContext(FoodContext);
    const { user, setUser } = useContext(UserContext);

    const logOut = async () => {
        navigation.navigate('Loading')
        try {
            await SecureStore.deleteItemAsync("user");
        } catch (e) {
            navigation.navigate('Navigation')
            alert("Error logging out.");
        } finally {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            })
            setUser(null);
        }
    }

    return (
        // Container
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.userInformationContainer}>
                    <View style={styles.profileIconContainer}>
                        <Text style={styles.circle}></Text>
                    </View>
                    <View style={styles.myProfileTextContainer}>
                        <Text style={styles.chooseHallText}>{user.username}</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <BigRectangleButton text='Change Name' onClick={() => navigation.navigate('Navigation')}/>
                    <BigRectangleButton text='Change Password' onClick={() => navigation.navigate('Navigation')}/>
                    <BigRectangleButton text='Edit Profile Photo' onClick={() => navigation.navigate('Navigation')}/>
                    <BigRectangleButton text='View My Rewards' onClick={() => navigation.navigate('Navigation')}/>
                    <BigRectangleButton text='Delete Account' onClick={() => navigation.navigate('Navigation')}/>
                </View>
                <View style={styles.logOutContainer}>
                    <Pressable style = {styles.chooseHallText}
                    onPress = {logOut}>
                        <Text style={styles.chooseHallText}>Log Out</Text>
                    </Pressable>
                </View>
                <Footer
                    leftButtonText={"Back"}
                    leftButtonPress={() => navigation.navigate('Choose Hall')}
                    iconButtonPress={() => navigation.navigate('Navigation')}
                    rightButtonText={"Review"}
                    rightButtonPress={() => navigation.navigate('Leave Review')}
                />
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
    myProfileTextContainer: {
        padding: 10,
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
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
    },
    buttonContainer: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileIconContainer: {
        marginTop: 60,
        alignItems: 'flex-start',
    },
    circle: {
        borderRadius: '75%',
        borderColor: 'black',
        borderWidth: 2,
        width: 150,
        height: 150,
        marginBottom: 30,
    },
    logOutContainer: {
        marginTop: 30,
        flex: 0.3,
    },
    userInformationContainer: {
        flexDirection: 'row',
    },
});