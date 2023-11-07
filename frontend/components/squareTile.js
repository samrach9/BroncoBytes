import React from 'react';
import { Text, StyleSheet, Pressable, View } from 'react-native';

export function SquareTile(props) {

    return (
        <View style={styles.container}>
            <Pressable style={styles.button}
                onPress={props.onClick}>
                <Text style={styles.buttonText}>{props.text}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display:"flex",
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 20,
        margin: 5,
        width: 150,
        height: 150,
        display:"flex",
        justifyContent: 'center',
        alignItems: 'center'
        
    },
    buttonText: {
        fontFamily: 'Bungee',
        fontSize: 15,
        color: '#B30738',
        textAlign: 'center',
        padding: 10,
    },
});
