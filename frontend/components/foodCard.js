import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Rating } from 'react-native-ratings';
import getReviewsByFood from '../api/getReviewsByFood';
import getUserById from '../api/getUserById';
import { FoodContext } from '../App';
import { useNavigation } from '@react-navigation/native';

export default function FoodCard(props) {

    const navigation = useNavigation();
    const { allFood, setAllFood } = useContext(FoodContext);

    const [loading, setLoading] = useState(true);

    let food = props.food;
    const firstImage = food.imageUrls.length > 0 ? food.imageUrls[0] : null;

    useEffect(() => {
        const getReviews = async () => {
            if (!('reviews' in food)) {
                food.reviews = await getReviewsByFood(food.foodId);
            }
            if (!(food.reviews)) {
                food.reviews = [];
            }
            for (let i = 0; i < food.reviews.length; i++) {
                if (!('user' in food.reviews[i])) {
                    food.reviews[i].user = await getUserById(food.reviews[i].userId);
                }
            }
            setAllFood(allFood.map((item) => {
                if (item.foodId == food.foodId) {
                    return food;
                } else {
                    return item;
                }
            }));
            setLoading(false);
        }
        getReviews();
    }, []);

    if (loading) {
        return (
            <View style={styles.content}>
                <View style={{ ...styles.ratingCard, alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
                    <ActivityIndicator style={{ padding: 10 }} size="large" color="#B30738" />
                </View>
            </View>
        )
    }

    return (
        <TouchableOpacity style={styles.content} onPress={() => navigation.navigate('Reviews Page', { food: food })}>
            <View style={styles.ratingCard}>
                <View style={styles.cardTitleContainer}>
                    <Text style={styles.cardTitle}>{food.name}</Text>
                </View>
                {
                    firstImage &&
                    <View style={styles.foodImageContainer}>
                        <Image source={{ uri: firstImage }}
                            style={styles.foodImage} />
                    </View>
                }
                {
                    'reviews' in food && food.reviews && food.reviews.length > 0 &&
                    <>
                        <View style={styles.notesContainer}>
                            <Text style={styles.notesText}>{'reviews' in food && food.reviews && food.reviews.length > 0 && food.reviews[0].body}</Text>
                        </View>
                        <View style={styles.starContainer}>
                            <Text style={styles.ratingText}>Rating: </Text>
                            <Rating
                                startingValue={food.rating}
                                readonly={true}
                                imageSize={20}
                                tintColor='#850529'
                                type='custom'
                                ratingBackgroundColor='#850529'
                            />
                        </View>
                        <View style={styles.tagsContainer}>
                            {
                                'tags' in food && food.tags && food.tags.map((tag) => {
                                    return (
                                        <View style={styles.tagButton}>
                                            <Text style={styles.tagText}>{tag}</Text>
                                        </View>
                                    );
                                })
                            }
                        </View>
                        <View style={styles.submittedContainer}>
                            <Text style={styles.submittedText}>- Submitted {'user' in food.reviews[0] && food.reviews[0].user && 'username' in food.reviews[0].user && "By: " + food.reviews[0].user.username} On: {new Intl.DateTimeFormat('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' }).format(food.reviews[0].dateCreated * 1000)} -</Text>
                        </View>
                    </>
                }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
    },
    ratingCard: {
        height: "auto",
        width: 300,
        backgroundColor: '#850529',
        marginVertical: 25,
        padding: 10,
        borderWidth: 2,
        borderColor: '#850529',
        borderRadius: 10
    },
    foodImageContainer: {
        borderColor: '#850529',
        borderWidth: 2,
        flex: 9,
        alignItems: 'center',
        marginBottom: 5,
        padding: 10
    },
    starContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    notesContainer: {
        flex: 2.5,
        margin: 10,
    },
    submittedContainer: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    submittedText: {
        fontSize: 10,
        color: '#db88a0'
    },
    foodImage: {
        width: '100%',
        height: '100%',
        aspectRatio: 1,
        borderRadius: 10
    },
    cardTitleContainer: {
        marginBottom: 10,
    },
    cardTitle: {
        fontFamily: 'Bungee',
        color: 'white',
        textAlign: 'center'
    },
    ratingText: {
        fontFamily: 'Bungee',
        color: 'white'
    },
    notesText: {
        fontSize: 10,
        color: 'white'
    },
    tagsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tagText: {
        fontFamily: 'Bungee',
        color: 'black',
        textAlign: 'center',
        fontSize: 10,
    },
    tagButton: {
        marginHorizontal: 7,
        marginVertical: 2.5,
        borderWidth: 4,
        borderRadius: 25,
        borderColor: 'white',
        height: 20,
        justifyContent: 'center',
        backgroundColor: 'white',
        flexWrap: 'wrap',
    },
});
