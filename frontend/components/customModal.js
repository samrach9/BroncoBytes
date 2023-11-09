import React from 'react';
import { StyleSheet, Modal, Text, TouchableOpacity, View } from 'react-native';

export function CustomModal({visible, setVisible, children}) {

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContentContainer}>
                    {children}
                    <TouchableOpacity onPress={() => setVisible(false)}>
                        <Text style={styles.modalText}>X</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000080',
    },
    modalContentContainer: {
        backgroundColor: '#B30738',
        justifyContent: 'center',
        width: 'auto',
        height: 'auto',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: 'white',
        borderWidth: 1,
    },
    modalText: {
        fontFamily: 'Bungee',
        fontSize: 16,
        color: 'white',
        padding: 10,
    }
});