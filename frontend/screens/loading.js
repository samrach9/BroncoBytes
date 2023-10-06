import React from 'react';
import { StyleSheet, Text, View, Image, Pressable, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native'

export default function Loading() {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>

            <Pressable
                onPress={() => navigation.navigate('Home')}
                style={({ pressed }) => {
                    return {
                        opacity: pressed ? 0.65 : 1,
                    }
                }}>

                <Image
                    source={require('../assets/BroncoBytesIcon.png')}
                    style={styles.icon} />
            </Pressable>

            <Text style={styles.loadText}>Bronco Bytes</Text>
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

