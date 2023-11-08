import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FoodContext } from '../App';
import { TopBar } from '../components/topBar';
import { Footer } from '../components/footer';
import FoodCard from '../components/foodCard';

export default function FoodsPage({route}) {

    const navigation = useNavigation();
    const {allFood, setAllFood} = useContext(FoodContext);

    const food = allFood.filter((item) => !('restaurantKey' in route.params) || 'restaurants' in item && item.restaurants.includes(route.params.restaurantKey));

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <TopBar text={route.params.restaurantName}/>
                <View style={styles.content}>
                    {food.map((item) => {
                        return (
                            <FoodCard key={item.foodId} food={item} />
                        )
                    })}
                </View>
            </View>
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