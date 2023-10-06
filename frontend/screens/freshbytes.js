import React from 'react';
import { StyleSheet, Text, View, Image, Pressable, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function FreshBytes() {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.topBar}>
                    <Text style={styles.topBarText}>Fresh Bytes</Text>
                </View>
                <View style={styles.content}>
                    <Text>Content</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <Pressable style={styles.backButtonContainer}
                    onPress={() => navigation.navigate('Choose Hall')}>
                    <View style={styles.backButtonText}>
                        <Text style={styles.buttonText}>Back</Text>
                    </View>
                </Pressable>
                <View style={styles.middleIconContainer}>
                    <View style={styles.leftLine}>
                    </View>
                    <Image
                        source={require('../assets/BroncoBytesIcon.png')}
                        style={styles.icon} />
                    <View style={styles.rightLine}>

                    </View>
                </View>
                <Pressable style={styles.reviewButtonContainer}
                    onPress={() => navigation.navigate('Leave Review')}>
                    <View style={styles.reviewButtonText}>
                        <Text style={styles.buttonText}>Review</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B30738',
    },
    contentContainer: {
        flex: 1,
    },
    topBar: {
        backgroundColor: 'white',
    },
    topBarText: {
        color: '#B30738',
        fontFamily: 'Bungee',
        fontSize: 36,
        padding: 20,
    },
    footer: {
        backgroundColor: 'white',
        height: 75,
        flexDirection: 'row',
    },
    backButtonContainer: {
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
    reviewButtonContainer: {
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