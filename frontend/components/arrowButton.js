import React from 'react';
import { Text, StyleSheet, Pressable, View } from 'react-native';

export function ArrowButton(props) {

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

        borderRadius: 20,
        margin: 5,
        width: 25,
        height: 25,
        display:"flex",
        justifyContent: 'center',
        alignItems: 'center'
        
    },
    buttonText: {
        fontFamily: 'Bungee',
        fontSize: 15,
        color: '#B30738',
        textAlign: 'center',
    },
});
