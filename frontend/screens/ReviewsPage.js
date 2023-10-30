import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TopBar } from '../components/topBar';
import { Footer } from '../components/footer';
import ReviewCard from '../components/reviewCard';
import FoodCard from '../components/foodCard';

export default function ReviewsPage({route}) {

    const navigation = useNavigation();
    
    const food = route.params.food; 
    
    return (
        <View style={styles.container}>
            <ScrollView style={styles.contentContainer}>
                <TopBar text={food.name}/>
                <FoodCard food={food} />
                <View style={styles.content}>
                    {food.reviews.map((item) => {
                        return (
                            <ReviewCard key={item.reviewId} review={item} />
                        )
                    })}
                </View>
            </ScrollView>
            <Footer
                leftButtonText={"Back"}
                leftButtonPress={() => navigation.pop()}
                iconButtonPress={() => navigation.navigate('Navigation')}
                rightButtonText={"Review"}
                rightButtonPress={() => navigation.navigate('Leave Review', {foodId: food.foodId})}
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
});