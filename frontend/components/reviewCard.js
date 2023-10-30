import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Rating } from 'react-native-ratings';
import { useNavigation } from '@react-navigation/native';

export default function FoodCard(props) {

    const navigation = useNavigation();

    const review = props.review;

    return (
        <TouchableOpacity style={styles.content} onPress={() => navigation.navigate('Review Page', {review: review})}>
            <View style={styles.ratingCard}>
                <View style={styles.cardTitleContainer}>
                    <Text style={styles.cardTitle}>{review.title}</Text>
                </View>
                <View style={styles.starContainer}>
                    <Text style={styles.ratingText}>Rating: </Text>
                    <Rating
                        startingValue={review.rating}
                        readonly={true}
                        imageSize={20}
                    />
                </View>
                <View style={styles.notesContainer}>
                    <Text style={styles.notesText}>Notes: {review.body}</Text>
                </View>
                <View style={styles.submittedContainer}>
                    <Text style={styles.submittedText}>- Submitted By: {review.user.username} On: {new Intl.DateTimeFormat('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' }).format(review.dateCreated * 1000)} -</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
    },
    ratingCard: {
        height: 400,
        width: 300,
        backgroundColor: 'white',
        margin: 50,
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
