import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Button, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FoodContext } from '../App';
import { TopBar } from '../components/topBar';
import { Footer } from '../components/footer';
import { BigRectangleButton } from '../components/bigRectangleButton';
import getUserById from '../api/getUserById';
import { UserContext } from '../App';
import { AllUsersContext } from '../App';
import getReviewsByUser from '../api/getReviewsByUser';

// options shift f
export default function Navigation() {

    const navigation = useNavigation();
    const { user, setUser } = useContext(UserContext);
    const { allUsers, setAllUsers } = useContext(AllUsersContext);

    async function viewFriendsFeed() {
        navigation.navigate('Loading');
        food = {
            foodId: 'friends',
            name: 'Friends Feed',
            reviews: [],
        }
        if (!('friends' in user) || !user.friends || user.friends.length == 0) {
            navigation.navigate('Reviews Page', { food: food })
        }
        for (const userId of user.friends) {
            console.log(userId)
            let friend = await getUserById(userId, allUsers, setAllUsers);
            let friendReviews = await getReviewsByUser(userId);
            friendReviews = friendReviews.map((item) => {
                item['user'] = friend;
                return item;
            });
            food.reviews = food.reviews.concat(friendReviews);
        }
        navigation.navigate('Reviews Page', { food: food })
    }

    return (
        // Container
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.chooseHallContainer}>
                    <Text style={styles.chooseHallText}>Bronco Bytes</Text>
                    <Image
                        source={require('../assets/LogoWhite.png')}
                        style={styles.icon} />
                </View>
                <View style={styles.buttonContainer}>
                    <BigRectangleButton text='Reviews' onClick={() => navigation.navigate('Home')} />
                    <BigRectangleButton text='Leave Review' onClick={() => navigation.navigate('Leave Review')} />
                    <BigRectangleButton text='My Profile' onClick={() => navigation.navigate('Account Profile')} />
                    <BigRectangleButton text='View Friends Feed' onClick={() => viewFriendsFeed()} />
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
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 60,
        
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
        fontSize: 35,
        color: 'white',
        textAlign: 'center',
    },
    buttonContainer: {
        alignContent: 'center',
        alignItems: 'center',
        paddingBottom: 50,
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