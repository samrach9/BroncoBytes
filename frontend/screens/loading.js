import React from 'react';
import { StyleSheet, Text, View, Image, Pressable, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native'

export default function Loading() {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/LogoRed.png')}
                style={styles.icon} />

            <Text style={styles.loadText}>Bronco Bytes</Text>
            <ActivityIndicator style={{ padding: 10 }} size="large" color="#B30738" />
        </View>

    );
};

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

