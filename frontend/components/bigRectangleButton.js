import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function BigRectangleButton(props) {

    const navigation = useNavigation();
    const {onClick} = props.onClick;

    return (
        <Pressable style={styles.button}
            onPress={props.onClick}>
            <Text style={styles.buttonText}>{props.text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 20,
        margin: 5,
        justifyContent: 'stretch',
        alignItems: 'stretch',
        width: 305,
    },
    buttonText: {
        fontFamily: 'Bungee',
        fontSize: 25,
        color: '#B30738',
        textAlign: 'center',
        padding: 10,
    },
});
