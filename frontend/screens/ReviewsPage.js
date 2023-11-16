import React, { useContext } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TopBar } from '../components/topBar';
import { Footer } from '../components/footer';
import ReviewCard from '../components/reviewCard';
import FoodCard from '../components/foodCard';
import { UserContext } from '../App';
import { AccountProfile } from '../components/accountProfile';

export default function ReviewsPage({route}) {

    const navigation = useNavigation();
    const { user, setUser } = useContext(UserContext);
    
    const food = route.params.food;
    const reviews = food.reviews.sort((a, b) => b.dateCreated - a.dateCreated); 
    
    return (
        <View style={styles.container}>
            <ScrollView style={styles.contentContainer}>
                <TopBar text={food.name}/>
                {food.foodId == user.userId ? <AccountProfile user={user}/> : <FoodCard food={food} />}
                <View style={styles.content}>
                    {reviews.map((item) => {
                        return (
                            <ReviewCard key={item.reviewId} review={item} canRemove={user.admin || user.userId == item.userId}/>
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