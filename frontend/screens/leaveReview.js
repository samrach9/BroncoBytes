import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import { FoodContext } from '../App';
import { UserContext } from '../App';
import { Rating } from 'react-native-ratings';
import { TopBar } from '../components/topBar';
import { Footer } from '../components/footer';
import uploadImage from '../helper/uploadImage';
import putReview from '../api/putReview';
import { CustomModal } from '../components/customModal';
import * as FileSystem from 'expo-file-system';
import { tags } from '../enum/tags';

export default function LeaveReview({ route }) {

    const navigation = useNavigation();
    const [counter, setCounter] = useState(0);
    const [globalIndex, setGlobalIndex] = useState(-1);

    const [mediaLibraryStatus, mediaLibraryRequestPermissions] = ImagePicker.useMediaLibraryPermissions();
    const [cameraStatus, cameraRequestPermissions] = ImagePicker.useCameraPermissions();

    const { allFood, setAllFood } = useContext(FoodContext);
    const { user, setUser } = useContext(UserContext);
    const userId = user.userId;
    const [foodId, setFoodId] = useState((route.params && "foodId" in route.params) ? route.params.foodId : null);
    const [rating, setRating] = useState(2.5);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const [imageURIs, setImageURIs] = useState([]);
    const [tempImageURIs, setTempImageURIs] = useState([]);
    const [imagePickerModalVisible, setImagePickerModalVisible] = useState(false);

    const [removeImageModalVisible, setRemoveImageModalVisible] = useState(false);

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
        setImagePickerModalVisible(false);
        setCounter(counter + 1);
        console.log(counter);
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
        setImagePickerModalVisible(false);
        setCounter(counter + 1);
        console.log(counter);
    };

    const removeImage = async () => {
        setImageURIs(imageURIs.filter((item) => item != imageURIs[globalIndex]));
        console.log(imageURIs[globalIndex]);
        setRemoveImageModalVisible(false);
    };


    const submitReview = async () => {
        if (foodId == null) {
            alert("Please select a food");
            return;
        }

        if (title == "") {
            alert("Please enter a title");
            return;
        }

        if (body == "") {
            alert("Please enter a body");
            return;
        }

        let imageUrls = [];

        navigation.navigate('Loading')

        await Promise.all(imageURIs.map(async (image, index) => {
            try {
                const promise = await uploadImage(image, `review-${userId}-${foodId}-${index}.${image.split('.').pop()}`, process.env.EXPO_PUBLIC_S3_REVIEWS_BUCKET_NAME);
                const url = promise.Location;
                imageUrls.push(url);
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
            imageUrls: imageUrls,
        };

        const reviewId = await putReview(review);
        review.reviewId = reviewId;
        review.user = user;
        review.dateCreated = Date.now() / 1000;

        await setAllFood(allFood.map((food) => {
            if (food.foodId == foodId) {
                if (!('reviews' in food)) {
                    food.reviews = [];
                }
                food.reviews.push(review);
                return food;
            } else {
                return food;
            }
        }));

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
            <ScrollView automaticallyAdjustKeyboardInsets={true}>
                <KeyboardAvoidingView style={styles.contentContainer} behavior='height'>
                    <RNPickerSelect
                        value={foodId}
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
                    <Text style={styles.labelText}>Upload Photo(s)</Text>
                    <CustomModal visible={imagePickerModalVisible} setVisible={setImagePickerModalVisible}>
                        <TouchableOpacity onPress={pickImage}>
                            <Text style={styles.labelText}>Pick From Library</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={takeImage}>
                            <Text style={styles.labelText}>Take Photo</Text>
                        </TouchableOpacity>
                    </CustomModal>
                    <CustomModal visible={removeImageModalVisible} setVisible={setRemoveImageModalVisible}>
                        <TouchableOpacity onPress={removeImage}>
                            <Text style={styles.labelText}>Delete Image</Text>
                        </TouchableOpacity>
                    </CustomModal>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', borderWidth: 2, borderColor: 'black' }}>
                        {imageURIs.map((image, index) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    setRemoveImageModalVisible(true);
                                    setGlobalIndex(index);
                                }}
                                    style={{ borderColor: 'black', borderWidth: 2 }}>
                                    <Image key={index} source={{ uri: image }} style={styles.image} />
                                </TouchableOpacity>
                            );
                        })}
                        <TouchableOpacity style={styles.image} onPress={() => setImagePickerModalVisible(true)}>
                            <Text style={{ fontSize: 50, textAlign: 'center', lineHeight: 90, color: 'white' }}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.tagsContainer}>
                        <Text style={styles.labelText}>Tags</Text>
                        <View style={styles.tagRowContent}>
                            <View style={styles.tagButton}>
                                <Text style={styles.tagText}>Vegan</Text>
                            </View>
                            <View style={styles.tagButton}>
                                <Text style={styles.tagText}>Vegetarian</Text>
                            </View>
                            <View style={styles.tagButton}>
                                <Text style={styles.tagText}>Raw</Text>
                            </View>
                        </View>
                        <Text style={styles.moreTagsText}>+ More Tags</Text>
                    </View>
                    <Text style={styles.labelText}>Leave a review</Text>
                    <TextInput style={styles.bodyInput} onChangeText={setBody} value={body} multiline={true} placeholder='What did you think?' blurOnSubmit={true} />
                </KeyboardAvoidingView>
            </ScrollView>
            <Footer
                leftButtonText={"Back"}
                leftButtonPress={() => navigation.pop()}
                iconButtonPress={() => navigation.navigate('Navigation')}
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
    bodyInput: {
        width: "80%",
        height: 120,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',
        textAlignVertical: 'top',
        padding: 10,
        paddingTop: 10,
        color: 'black',
        backgroundColor: 'white',
    },
    labelText: {
        fontFamily: 'Bungee',
        fontSize: 21,
        color: 'white',
        padding: 10,
        textAlign: 'center',
    },
    image: {
        width: 100,
        height: 100,
        margin: 5,
        borderWidth: 4,
        borderColor: 'white',
        backgroundColor: '#CB5476',
    },
    uploadButton: {
        width: 100,
        height: 100,
        margin: 5,
        borderWidth: 1,
        borderColor: 'white',
    },
    tagsContainer: {
        margin: 15,
        alignItems: 'center',
    },
    tagRowContent: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    tagText: {
        fontFamily: 'Bungee',
        color: 'white',
        textAlign: 'center',
        fontSize: 12,
    },
    tagButton: {
        marginHorizontal: 7,
        borderWidth: 4,
        borderRadius: 25,
        borderColor: 'white',
        height: 40,
        width: 100,
        justifyContent: 'center'
    },
    moreTagsText: {
        fontFamily: 'Bungee',
        fontSize: 14,
        color: 'white',
        textalign: 'center',
        marginTop: 5,
    }
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
