import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FoodContext } from '../App';
import { TopBar } from '../components/topBar';
import { Footer } from '../components/footer';
import FoodCard from '../components/foodCard';
import getAllFood from '../api/getAllFood';

export default function FoodsPage({route}) {

    const navigation = useNavigation();
    const {allFood, setAllFood} = useContext(FoodContext);
    const [refreshing, setRefreshing] = useState(false);
    const [food, setFood] = useState(allFood.filter((item) => !('restaurantKey' in route.params) || 'restaurants' in item && item.restaurants.includes(route.params.restaurantKey)));

    const onRefresh = async () => {
        setRefreshing(true);
        setAllFood(await getAllFood());
        setFood(allFood.filter((item) => !('restaurantKey' in route.params) || 'restaurants' in item && item.restaurants.includes(route.params.restaurantKey)));
        setRefreshing(false);
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.contentContainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
                <TopBar text={route.params.restaurantName}/>
                <View style={styles.content}>
                    {!refreshing && food.map((item) => {
                        return (
                            <FoodCard key={item.foodId} food={item} />
                        )
                    })}
                </View>
            </ScrollView>
            <Footer
                leftButtonText={"Back"}
                leftButtonPress={() => navigation.pop()}
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
});