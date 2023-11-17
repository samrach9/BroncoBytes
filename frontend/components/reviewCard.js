import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Rating } from 'react-native-ratings';
import { useNavigation } from '@react-navigation/native';
import { FoodContext } from '../App';
import removeReview from '../api/removeReview';
import { CustomModal } from './customModal';
import { ArrowButton } from './arrowButton';

export default function ReviewCard(props) {

    const navigation = useNavigation();
    const review = props.review;
    const { allFood, setAllFood } = useContext(FoodContext);
    const [confirmRemoveModalVisible, setConfirmRemoveModalVisible] = useState(false);

    const handleRemoveReview = async () => {
        navigation.navigate('Loading');
        await removeReview(review.reviewId);
        setAllFood(allFood.map((item) => {
            if (item.foodId == review.foodId) {
                item.reviews = item.reviews.filter((item) => item.reviewId != review.reviewId);
                if ('imageUrls' in review && review.imageUrls.length > 0) {
                    item.imageUrls = item.imageUrls.filter((item) => !review.imageUrls.includes(item));
                }
                if (item.reviews.length == 0) {
                    item.rating = 0;
                } else {
                    item.rating = (item.rating * (item.reviews.length + 1) - review.rating) / item.reviews.length;
                }
            }
            return item;
        }));
        navigation.pop();
    }

    const firstImage = review.imageUrls.length > 0 ? review.imageUrls[0] : null;
    const secondImage = review.imageUrls.length > 1 ? review.imageUrls[1] : null;
    const thirdImage = review.imageUrls.length > 2 ? review.imageUrls[2] : null;

    const [displayedImage, setDisplayedImage] = useState(firstImage);


    const next = () => {
        if (displayedImage === firstImage) {
            setDisplayedImage(secondImage);
        }
        else if (displayedImage === secondImage && thirdImage != null) {
            setDisplayedImage(thirdImage);
        }
    };

    const prev = () => {
        if (displayedImage === thirdImage) {
            setDisplayedImage(secondImage);
        }
        else if (displayedImage === secondImage) {
            setDisplayedImage(firstImage);
        }
    };

    return (
        <TouchableOpacity style={styles.content} onPress={() => navigation.navigate('Review Page', { review: review })}>
            <View style={styles.ratingCard}>
                <View style={styles.cardTitleContainer}>
                    <Text style={styles.cardTitle}>{review.title}</Text>
                </View>
                {
                    displayedImage &&
                    <View style={styles.foodImageContainer}>
                        <Image source={{ uri: displayedImage }} style={styles.foodImage} />
                    </View>
                }
                {
                    secondImage &&
                    <View style={styles.oneRow}>
                        <ArrowButton text="<" onClick={() => prev()} direction='left' />
                        <ArrowButton text=">" onClick={() => next()} direction='right' />
                    </View>
                }
                <View style={styles.starContainer}>
                    <Text style={styles.ratingText}>Rating: </Text>
                    <Rating
                        startingValue={review.rating}
                        readonly={true}
                        imageSize={20}
                        tintColor='#850529'
                        type='custom'
                        ratingBackgroundColor='#850529'
                    />
                </View>
                <View style={styles.notesContainer}>
                    <Text style={styles.notesText}>{review.body}</Text>
                </View>
                <View style={styles.submittedContainer}>
                    <Text style={styles.submittedText}>- Submitted By: {review.user.username} On: {new Intl.DateTimeFormat('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' }).format(review.dateCreated * 1000)} -</Text>
                </View>
                {
                    props.canRemove &&
                    <TouchableOpacity onPress={() => setConfirmRemoveModalVisible(true)}>
                        <Text style={styles.removeText}>Remove</Text>
                    </TouchableOpacity>
                }
                <CustomModal visible={confirmRemoveModalVisible} setVisible={setConfirmRemoveModalVisible}>
                    <TouchableOpacity onPress={() => handleRemoveReview()}>
                        <Text style={styles.modalText}>Confirm Remove</Text>
                    </TouchableOpacity>
                </CustomModal>
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
        margin: 25,
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
        //marginBottom: 5,
        padding: 10
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
        color: 'white',
    },
    notesText: {
        fontSize: 10,
        color: 'white',
    },
    removeText: {
        fontFamily: 'Bungee',
        color: 'white',
        textAlign: 'center',
        marginTop: 10,
    },
    modalText: {
        fontFamily: 'Bungee',
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        padding: 10,
    },
    oneRow: {
        flexDirection: 'row',
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dots: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
