import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { CustomModal } from './customModal';

export function removeImageModal({ visible, setVisible}) {

    return (
        <CustomModal visible={visible} setVisible={setVisible}>
            <TouchableOpacity>
                <Text style={styles.labelText}>Delete Image</Text>
            </TouchableOpacity>
        </CustomModal>
    )
}

const styles = StyleSheet.create({
    labelText: {
        fontFamily: 'Bungee',
        fontSize: 16,
        color: 'white',
        padding: 10,
    },
});
