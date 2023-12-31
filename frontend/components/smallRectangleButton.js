import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

export function SmallRectangleButton(props) {

    return (
        <Pressable style={styles.button} onPress={props.onClick}>
            <Text style={styles.buttonText}>{props.text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 202,
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 20,
        margin: 5,
    },
    buttonText: {
        fontFamily: 'Bungee',
        fontSize: 20,
        color: '#B30738',
        textAlign: 'center',
        padding: 10,
    },
});
