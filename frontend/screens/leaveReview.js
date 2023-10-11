import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import { FoodContext } from '../App';
import { Rating } from 'react-native-ratings';
import { TopBar } from '../components/topBar';
import { Footer } from '../components/footer';
import uploadImage from '../helper/uploadImage';
import putReview from '../api/putReview';

export default function LeaveReview() {

    const navigation = useNavigation();

    const [mediaLibraryStatus, mediaLibraryRequestPermissions] = ImagePicker.useMediaLibraryPermissions();
    const [cameraStatus, cameraRequestPermissions] = ImagePicker.useCameraPermissions();

    const { allFood, setAllFood } = useContext(FoodContext);
    const [userId, setUserId] = useState('0');
    const [foodId, setFoodId] = useState(null);
    const [rating, setRating] = useState(2.5);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const [imageURIs, setImageURIs] = useState([]);
    const [imagePickerModalVisible, setImagePickerModalVisible] = useState(false);

    const pickImage = async () => {
        if (!mediaLibraryStatus.granted) {
            mediaLibraryRequestPermissions();
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImageURIs([...imageURIs, result.assets[0].uri]);
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
        });

        console.log(result);

        if (!result.canceled) {
            setImageURIs([...imageURIs, result.assets[0].uri]);
        }
    };


    const submitReview = async () => {
        if (foodId == null) {
            alert("Please select a food");
            return;
        }

        if ((title == "" && body != "")) {
            alert("Please enter a title");
            return;
        }
        
        let imageURLs = [];

        navigation.navigate('LoadingScreen')

        await Promise.all(imageURIs.map(async (image, index) => {
            try {
                const promise = await uploadImage(image, `review-${userId}-${foodId}-${index}.${image.split('.').pop()}`);
                const url = promise.Location;
                imageURLs.push(url);
            } catch (e) {
                console.warn(e);
            }
        }));

        const review = {
            userId: userId,
            foodId: foodId,
            rating: rating,
            title: title,
            body: body,
            imageUrls: imageURLs,
        };

        await putReview(review);

        navigation.navigate('Leave Review');
        alert("Review submitted!");
        resetState();
    }

    const resetState = () => {
        setFoodId(null);
        setRating(2.5);
        setTitle("");
        setBody("");
        setImageURIs([]);
    }

    return (
        <View style={styles.container}>
            <TopBar text={"Leave a Review"} />
            <KeyboardAvoidingView style={styles.contentContainer} behavior='height'>
                <RNPickerSelect
                    onValueChange={(value) => setFoodId(value)}
                    items={allFood.map(food => ({ label: food.name, value: food.foodId }))}
                    style={pickerSelectStyles}
                />
                <Text style={styles.labelText}>Rating</Text>
                <Rating
                    onFinishRating={setRating}
                    startingValue={2.5}
                    jumpValue={1}
                    tintColor='#B30738'
                />
                <Text style={styles.labelText}>Title</Text>
                <TextInput style={styles.titleInput} onChangeText={setTitle} value={title} placeholder='Title your review' />
                <Text style={styles.labelText}>Body</Text>
                <TextInput style={styles.bodyInput} onChangeText={setBody} value={body} multiline={true} placeholder='What did you think?' blurOnSubmit={true} />
                <Text style={styles.labelText}>Upload Photo(s)</Text>
                <Modal visible={imagePickerModalVisible} animationType='fade' transparent>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContentContainer}>
                            <TouchableOpacity onPress={pickImage}>
                                <Text style={styles.labelText}>Pick From Library</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={takeImage}>
                                <Text style={styles.labelText}>Take Photo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setImagePickerModalVisible(false)}>
                                <Text style={styles.labelText}>X</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.image} onPress={() => setImagePickerModalVisible(true)}>
                        <Text style={{ fontSize: 50, textAlign: 'center', lineHeight: 90, color: 'white' }}>+</Text>
                    </TouchableOpacity>
                    {imageURIs.map((image, index) => (
                        <Image key={index} source={{ uri: image }} style={styles.image} />
                    ))}
                </View>
            </KeyboardAvoidingView>
            <Footer
                leftButtonText={"Back"}
                leftButtonPress={() => navigation.navigate('Home')}
                rightButtonText={"Submit"}
                rightButtonPress={() => submitReview()}
            />
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
        alignContent: 'center',
        justifyContent: 'top',
        alignItems: 'center',
    },
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
    bodyInput: {
        width: "80%",
        height: 120,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',
        textAlignVertical: 'top',
        padding: 10,
        paddingTop: 10,
        color: 'white',
    },
    titleInput: {
        width: "80%",
        height: 40,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',
        padding: 10,
        color: 'white',
    },
    labelText: {
        fontFamily: 'Bungee',
        fontSize: 16,
        color: 'white',
        padding: 10,
    },
    image: {
        width: 100,
        height: 100,
        margin: 5,
        borderWidth: 1,
        borderColor: 'white',
    },
    uploadButton: {
        width: 100,
        height: 100,
        margin: 5,
        borderWidth: 1,
        borderColor: 'white',
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        width: "80%",
        height: 40,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',
        padding: 10,
        margin: 10,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Bungee',
        textAlign: 'center',
        alignSelf: 'center',
    },
    inputAndroid: {
        width: "80%",
        height: 40,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',
        padding: 10,
        margin: 10,
    },
})