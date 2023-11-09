import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { CustomModal } from './customModal';

export function ImagePickerModal({ visible, setVisible, handleNewImageURI }) {

    const [mediaLibraryStatus, mediaLibraryRequestPermissions] = ImagePicker.useMediaLibraryPermissions();
    const [cameraStatus, cameraRequestPermissions] = ImagePicker.useCameraPermissions();

    const pickImage = async () => {
        if (!mediaLibraryStatus.granted) {
            mediaLibraryRequestPermissions();
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
            circleCrop: true,
        });

        console.log(result);

        if (!result.canceled) {
            handleNewImageURI(result.assets[0].uri);
        }
    };

    const takeImage = async () => {
        if (!cameraStatus.granted) {
            cameraRequestPermissions();
        }
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
            circleCrop: true,
        });

        console.log(result);

        if (!result.canceled) {
            handleNewImageURI(result.assets[0].uri);
        }
    };

    return (
        <CustomModal visible={visible} setVisible={setVisible}>
            <TouchableOpacity onPress={pickImage}>
                <Text style={styles.labelText}>Pick From Library</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={takeImage}>
                <Text style={styles.labelText}>Take Photo</Text>
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
