import React from 'react';
import { StyleSheet, View, Pressable, Image, Text } from 'react-native';

export function Footer(props) {
    return (
        <View style={styles.footer}>
            <Pressable style={styles.leftButtonContainer}
                onPress={props.leftButtonPress}>
                <View>
                    <Text style={styles.buttonText}>{props.leftButtonText}</Text>
                </View>
            </Pressable>
            <Pressable style={styles.middleIconContainer}
                onPress={props.iconButtonPress}>
                <View style={styles.leftLine} />
                <Image
                    source={require('../assets/BroncoBytesIcon.png')}
                    style={styles.icon} />
                <View style={styles.rightLine} />
            </Pressable>
            <Pressable style={styles.rightButtonContainer}
                onPress={props.rightButtonPress}>
                <View>
                    <Text style={styles.buttonText}>{props.rightButtonText}</Text>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        backgroundColor: 'white',
        height: 75,
        flexDirection: 'row',
    },
    leftButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    middleIconContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    rightButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: 'Bungee',
        fontSize: 20,
        color: '#B30738',
    },
    icon: {
        width: 40,
        height: 40,
    },
    leftLine: {
        borderWidth: 2,
        borderColor: '#B30738',
        height: 36,
    },
    rightLine: {
        borderWidth: 2,
        borderColor: '#B30738',
        height: 36,
    },
});