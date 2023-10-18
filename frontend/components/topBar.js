import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export function TopBar(props) {
    return (
        <View style={styles.topBar}>
            <Text style={styles.topBarText}>{props.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    topBar: {
        backgroundColor: 'white',
        width: "100%",
    },
    topBarText: {
        color: '#B30738',
        fontFamily: 'Bungee',
        fontSize: 36,
        padding: 20,
    },
});