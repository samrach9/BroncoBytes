import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, ScrollView, RefreshControl, Text, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FoodContext } from '../App';
import { TopBar } from '../components/topBar';
import { Footer } from '../components/footer';
import FoodCard from '../components/foodCard';
import getAllFood from '../api/getAllFood';
import { TagButton } from '../components/tagButton';

export default function FoodsPage({ route }) {

    const navigation = useNavigation();
    const { allFood, setAllFood } = useContext(FoodContext);
    const [refreshing, setRefreshing] = useState(false);
    const [food, setFood] = useState(allFood.filter((item) => !('restaurantKey' in route.params) || 'restaurants' in item && item.restaurants.includes(route.params.restaurantKey)));
    const [isSelected, setIsSelected] = useState(true);
    const [foodOrDrinkSelected, setFoodOrDrink] = useState("Food");

    const onRefresh = async () => {
        setRefreshing(true);
        setAllFood(await getAllFood());
        setFood(allFood.filter((item) => !('restaurantKey' in route.params) || 'restaurants' in item && item.restaurants.includes(route.params.restaurantKey)));
        setRefreshing(false);
    }

    const selectedFoodProps = {
        activeOpacity: 1,
        underlayColor: '#850529',
        style: foodOrDrinkSelected == "Food" ? styles.tagButtonSelected : styles.tagButtonDeselected,
        onPress: () => {
            setIsSelected(!isSelected)
            setFoodOrDrink("Food")
        }
        ,
    };

    const selectedDrinksProps = {
        activeOpacity: 1,
        underlayColor: '#850529',
        style: foodOrDrinkSelected == "Drink" ? styles.tagButtonSelected : styles.tagButtonDeselected,
        onPress: () => {
            setIsSelected(!isSelected)
            setFoodOrDrink("Drink")
        },
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.contentContainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <TopBar text={route.params.restaurantName} />
                <View style={styles.content}>
                    <View style={styles.filterBarContainer}>
                        <View style={styles.tagContainer}>
                            <TouchableHighlight {...selectedFoodProps}>
                                <View style={styles.tagButton}>
                                    <Text style={foodOrDrinkSelected == "Food" ? styles.tagTextSelected : styles.tagTextDeselected}>Food</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.tagContainer}>
                            <TouchableHighlight {...selectedDrinksProps}>
                                <View style={styles.tagButton}>
                                    <Text style={foodOrDrinkSelected == "Drink" ? styles.tagTextSelected : styles.tagTextDeselected}>Drinks</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                    {!refreshing && food.filter((props) => props.type == foodOrDrinkSelected).map((item) => {
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
    filterBarContainer: {
        flexDirection: 'row',
        marginTop: 15,
        marginLeft: 7,
    },
    filterButton: {
        borderColor: 'white',
        borderWidth: 5,
        backgroundColor: '#B30738',
        width: 115,
        borderRadius: 20,
        marginVertical: 7,
        marginHorizontal: 5,
    },
    filterText: {
        fontFamily: 'Bungee',
        fontSize: 28,
        color: 'white',
        margin: 5,
        textAlign: 'center',
    },
    tagTextSelected: {
        fontFamily: 'Bungee',
        color: '#B30738',
        textAlign: 'center',
        fontSize: 16,
    },
    tagTextDeselected: {
        fontFamily: 'Bungee',
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    tagButtonSelected: {
        borderWidth: 4,
        borderRadius: 25,
        borderColor: 'white',
        height: 40,
        width: 100,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    tagButtonDeselected: {
        borderWidth: 4,
        borderRadius: 25,
        borderColor: 'white',
        height: 40,
        width: 100,
        justifyContent: 'center',
    },

    tagContainer: {
        marginHorizontal: 7,
        marginBottom: 7,
    }
});