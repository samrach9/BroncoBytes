import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FoodContext } from '../App';
import { TopBar } from '../components/topBar';
import { Footer } from '../components/footer';

export default function screenFramework() {

    const navigation = useNavigation();
    const {allFood, setAllFood} = useContext(FoodContext);

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <TopBar text={"Screen Framework"}/>
                <View style={styles.content}>
                    <Text>Content</Text>
                </View>
            </View>
            <Footer
                leftButtonText={"Back"}
                leftButtonPress={() => navigation.navigate('Choose Hall')}
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