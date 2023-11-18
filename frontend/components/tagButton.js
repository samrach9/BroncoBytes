import { React, useState } from 'react';
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native';
import { tags } from '../enum/tags';

export function TagButton(props) {

    const [isSelected, setIsSelected] = useState(false);
    const selectedProps = {
        activeOpacity: 0,
        underlayColor: 'white',
        style: isSelected ? styles.tagButtonSelected : styles.tagButtonDeselected,
        onShowUnderlay: () => console.log("test"),
        onPress: () => setIsSelected(!isSelected),
    };

    return (
        <View style={styles.tagContainer}>
            <TouchableHighlight {...selectedProps}>
                <View style={styles.tagButton}>
                    <Text style={isSelected ? styles.tagTextSelected : styles.tagTextDeselected}>{props.text}</Text>
                </View>
            </TouchableHighlight>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center'
    },
    tagTextSelected: {
        fontFamily: 'Bungee',
        color: '#B30738',
        textAlign: 'center',
        fontSize: 16,
    },
    tagTextDeselected: {
        fontFamily: 'Bungee',
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
    tagButtonSelected: {
        borderWidth: 4,
        borderRadius: 25,
        borderColor: 'white',
        height: 40,
        width: 100,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    tagButtonDeselected: {
        borderWidth: 4,
        borderRadius: 25,
        borderColor: 'white',
        height: 40,
        width: 100,
        justifyContent: 'center',
    },

    tagContainer: {
        marginHorizontal: 7,
        marginBottom: 7,
    }
});
