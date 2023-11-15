import React from 'react';
import { Text, StyleSheet, Pressable, View, Image } from 'react-native';

export function ArrowButton(props) {

    if (props.direction === 'left'){
        return (
            <View style={styles.container}>
                <Pressable style={styles.button} onPress={props.onClick}>
                    <Image source={require('../assets/Left.png')} style={styles.icon} />
                </Pressable>
            </View>
        )
    }
    else if (props.direction === 'right'){
        return (
            <View style={styles.container}>
                <Pressable style={styles.button} onPress={props.onClick}>
                    <Image source={require('../assets/Right.png')} style={styles.icon} />
                </Pressable>
            </View>
        )
    }
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
    icon: {
        width: 15,
        height: 15,
        margin: 10,
    },
});
