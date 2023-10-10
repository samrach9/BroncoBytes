import React from 'react';
import { StyleSheet, Text, View, Image, Pressable, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LeaveReview() {

    const navigation = useNavigation();

    return(
        <Text>Leave Review Screen</Text>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
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
    }
});