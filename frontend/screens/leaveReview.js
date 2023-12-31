import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, } from 'react-native';
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

export default function LeaveReview({ route }) {

    const navigation = useNavigation();
    const [globalCount, setGlobalCounter] = useState(1);
    const [globalIndex, setGlobalIndex] = useState(-1);

    const [mediaLibraryStatus, mediaLibraryRequestPermissions] = ImagePicker.useMediaLibraryPermissions();
    const [cameraStatus, cameraRequestPermissions] = ImagePicker.useCameraPermissions();

    const { allFood, setAllFood } = useContext(FoodContext);
    const { user, setUser } = useContext(UserContext);
    const userId = user.userId;
    const [foodId, setFoodId] = useState((route.params && "foodId" in route.params) ? route.params.foodId : null);
    const [rating, setRating] = useState(2.5);
    const [body, setBody] = useState("");

    const [imageURIs, setImageURIs] = useState([]);
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
        setGlobalCounter(globalCount + 1);
        console.log(globalCount);
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
        setGlobalCounter(globalCount + 1);
        console.log(globalCount);
    };

    const removeImage = async () => {
        setImageURIs(imageURIs.filter((item) => item != imageURIs[globalIndex]));
        console.log(imageURIs[globalIndex]);
        setRemoveImageModalVisible(false);
        setGlobalCounter(globalCount - 1);
        console.log(globalCount);
    };


    const submitReview = async () => {
        if (foodId == null) {
            alert("Please select a food");
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
                const timestamp = Date.now() / 1000;
                const promise = await uploadImage(image, `review_${userId}_${foodId}_${timestamp}_${index}.${image.split('.').pop()}`, process.env.EXPO_PUBLIC_S3_REVIEWS_BUCKET_NAME);
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
                if (!('imageUrls' in food)) {
                    food.imageUrls = [];
                }
                food.imageUrls = food.imageUrls.concat(imageUrls);
                food.rating = (food.rating * (food.reviews.length - 1) + rating) / food.reviews.length;
                return food;
            } else {
                return food;
            }
        }));

        let updatedUser = user;
        updatedUser.totalReviews = updatedUser.totalReviews + 1;
        updatedUser.lastActive = Date.now() / 1000;
        console.log(updatedUser);

        await setUser(updatedUser);

        navigation.navigate('Leave Review');
        alert("Review submitted!");
        resetState();
    }

    const resetState = () => {
        setFoodId(null);
        setRating(2.5);
        setBody("");
        setImageURIs([]);
    }

    return (
        <View style={styles.container}>
            <TopBar text={"Leave a Review"} />
            <View style={styles.contentContainer}>
                <ScrollView automaticallyAdjustKeyboardInsets={true}>
                    <KeyboardAvoidingView behavior='height'>
                        <View style={styles.RNPickerSelectContainer}>
                            <RNPickerSelect
                                value={foodId}
                                onValueChange={(value) => setFoodId(value)}
                                items={allFood.map(food => ({ label: food.name, value: food.foodId }))}
                                style={pickerSelectStyles}
                            />
                        </View>
                        <View style={styles.ratingContainer}>
                            <Text style={styles.labelText}>Rating</Text>
                            <Rating
                                onFinishRating={setRating}
                                startingValue={2.5}
                                jumpValue={1}
                                tintColor='#B30738'
                            />
                        </View>
                        <View style={styles.uploadPhotosContainer}>
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
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                                {imageURIs.map((image, index) => {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            setRemoveImageModalVisible(true);
                                            setGlobalIndex(index);
                                        }}>
                                            <Image key={index} source={{ uri: image }} style={styles.image} />
                                        </TouchableOpacity>
                                    );
                                })}
                                {
                                    globalCount < 4 ? (
                                        <TouchableOpacity style={styles.image} onPress={() => setImagePickerModalVisible(true)}>
                                            <Text style={{ fontSize: 50, textAlign: 'center', lineHeight: 90, color: 'white' }}>+</Text>
                                        </TouchableOpacity>
                                    ) : null
                                }
                            </View>
                        </View>
                        <View style={styles.leaveReviewContainer}>
                            <Text style={styles.labelText}>Leave a review</Text>
                            <TextInput style={styles.bodyInput} onChangeText={setBody} value={body} multiline={true} placeholder='What did you think?' blurOnSubmit={true} />
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
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
        justifyContent: 'center'
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
        marginBottom: 20,
        alignSelf: 'center'
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
        borderWidth: 3.5,
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
    ratingContainer: {
        margin: 10,
    },
    leaveReviewContainer: {
        margin: 10,
    },
    uploadPhotosContainer: {
        margin: 10,
        justifyContent: 'center'
    },
    RNPickerSelectContainer: {

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
        margin: 15,
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
        margin: 15,
    },
})
