import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import * as Crypto from 'expo-crypto';
import { Footer } from '../components/footer';
import { BigRectangleButton } from '../components/bigRectangleButton';
import { SmallRectangleButton } from '../components/smallRectangleButton';
import { UserContext } from '../App';
import * as SecureStore from 'expo-secure-store';
import { CustomModal } from '../components/customModal';
import updateUser from '../api/updateUser';
import removeUser from '../api/removeUser';
import { ImagePickerModal } from '../components/imagePickerModal';
import getReviewsByUser from '../api/getReviewsByUser';
import getUserByEmail from '../api/getUserByEmail';
import getUserByUsername from '../api/getUserByUsername';

// options shift f
export default function AccountProfile() {

    const navigation = useNavigation();
    const { user, setUser } = useContext(UserContext);
    const [changeNmeModalVisible, setChangeNameModalVisible] = useState(false);
    const [changePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
    const [changeProfilePhotoModalVisible, setChangeProfilePhotoModalVisible] = useState(false);
    const [deleteAccountModalVisible, setDeleteAccountModalVisible] = useState(false);
    const [addAdminModalVisible, setAddAdminModalVisible] = useState(false);

    const handleSubmit = async (user) => {
        navigation.navigate('Loading')
        const result = await updateUser(user);
        navigation.navigate('Account Profile')
        if ("error" in result) {
            alert(result.error);
            return false;
        } else {
            setUser(result.user);
            await SecureStore.setItemAsync("user", JSON.stringify(result.user));
            return true;
        }
    }

    function ChangeNameModal() {
        const [newName, setNewName] = useState('');

        const handleNameSubmit = async () => {
            if (newName === '') {
                alert("Please enter a name.");
                return;
            }
            const updatedUser = { ...user, username: newName };
            if (await handleSubmit(updatedUser)) {
                setChangeNameModalVisible(false);
            }
        }

        return (
            <CustomModal visible={changeNmeModalVisible} setVisible={setChangeNameModalVisible}>
                <Text style={styles.labelText}>Change Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter new name"
                    value={newName}
                    onChangeText={setNewName}
                />
                <TouchableOpacity onPress={handleNameSubmit}>
                    <Text style={styles.labelText}>Submit</Text>
                </TouchableOpacity>
            </CustomModal>
        )
    }

    function ChangePasswordModal() {
        const [newPassword, setNewPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');

        const handlePasswordSubmit = async () => {
            if (newPassword === '' || confirmPassword === '') {
                alert("Please enter a password.");
                return;
            }
            if (newPassword !== confirmPassword) {
                alert("Passwords do not match.");
                return;
            }
            const newHashedPassword = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, newPassword + process.env.EXPO_PUBLIC_SALT);
            const updatedUser = { ...user, password: newHashedPassword };
            if (await handleSubmit(updatedUser)) {
                setChangePasswordModalVisible(false);
            }
        }

        return (
            <CustomModal visible={changePasswordModalVisible} setVisible={setChangePasswordModalVisible}>
                <View style={styles.contentContainer}>
                    <Text style={styles.labelText}>Change Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter new password"
                        value={newPassword}
                        onChangeText={setNewPassword}
                        secureTextEntry={true}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={true}
                    />
                    <TouchableOpacity onPress={handlePasswordSubmit}>
                        <Text style={styles.labelText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </CustomModal>
        )
    }

    function ChangeProfilePhotoModal() {

        const handleNewImageURI = async (uri) => {
            var url = null;

            navigation.navigate('Loading')
            setChangeProfilePhotoModalVisible(false);

            try {
                const promise = await uploadImage(uri, `${user.userId}.${uri.split('.').pop()}`, process.env.EXPO_PUBLIC_S3_USERS_BUCKET_NAME);
                url = promise.Location;
            } catch (e) {
                navigation.navigate('Account Profile')
                setChangeProfilePhotoModalVisible(true);
                alert("Error uploading image.");
                console.warn(e);
                return;
            }

            const updatedUser = { ...user, photoUrl: url };
            if (await handleSubmit(updatedUser)) {
                setChangeProfilePhotoModalVisible(false);
            }
        }

        return (
            <ImagePickerModal visible={changeProfilePhotoModalVisible} setVisible={setChangeProfilePhotoModalVisible} handleNewImageURI={handleNewImageURI}/>
        )
    }

    async function viewUserReviews() {
        navigation.navigate('Loading')
        const reviews = await getReviewsByUser(user.userId);
        const reviewsWithUsername = reviews.map((review) => { return { ...review, user: user } });
        const userFood = {
            foodId: user.userId,
            name: "Your Reviews",
            reviews: reviewsWithUsername,
        }
        navigation.navigate('Reviews Page', { food: userFood });
    }

    function DeleteAccountModal() {
        const [password, setPassword] = useState('');

        const handleDeleteAccount = async () => {
            if (password === '') {
                alert("Please enter a password.");
                return;
            }
            const userPassword = await SecureStore.getItemAsync("password");
            const hashedPassword = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password + process.env.EXPO_PUBLIC_SALT);
            if (hashedPassword !== userPassword) {
                alert("Incorrect password.");
                return;
            }
            try {
                await removeUser(user);
                await SecureStore.deleteItemAsync("user");
            } catch (e) {
                alert("Error deleting account.");
            } finally {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                })
                setUser(null);
            }
        }

        return (
            <CustomModal visible={deleteAccountModalVisible} setVisible={setDeleteAccountModalVisible}>
                <View style={styles.contentContainer}>
                    <Text style={styles.labelText}>Delete Account</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />
                    <TouchableOpacity onPress={handleDeleteAccount}>
                        <Text style={styles.labelText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </CustomModal>
        )
    }

    function AddAdminModal() {
        const [password, setPassword] = useState('');
        const [newAdmin, setNewAdmin] = useState('');
        
        const handleAddAdmin = async () => {
            if (hashedPassword !== userPassword) {
                alert("Incorrect password.");
                return;
            }

            const userPassword = await SecureStore.getItemAsync("password");
            const hashedPassword = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password + process.env.EXPO_PUBLIC_SALT);

            if (newAdmin === '') {
                alert("Please enter a username or email.");
                return;
            }

            let newAdminUser = null;
            const emailRegex = /\S+@\S+\.\S+/;

            try {
                navigation.navigate('Loading');
                setAddAdminModalVisible(false);
                let result = null;
                if (emailRegex.test(newAdmin)) {
                    result = await getUserByEmail(newAdmin);
                } else {
                    result = await getUserByUsername(newAdmin);
                }
                if ('error' in result) {
                    navigation.navigate('Account Profile');
                    setAddAdminModalVisible(true);
                    alert(result.error);
                    return;
                }
                newAdminUser = result.user;
            } catch (e) {
                navigation.navigate('Account Profile');
                setAddAdminModalVisible(true);
                alert("Error finding user.");
                return;
            }                

            newAdminUser.admin = true;
            const result = await updateUser(newAdminUser);
            navigation.navigate('Account Profile');
            if ("error" in result) {
                setAddAdminModalVisible(true);
                alert(result.error);
                return false;
            } else {
                setAddAdminModalVisible(false);
            }
        }

        return (
            <CustomModal visible={addAdminModalVisible} setVisible={setAddAdminModalVisible}>
                <View style={styles.contentContainer}>
                    <Text style={styles.labelText}>Add Admin</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter username or email of new admin"
                        value={newAdmin}
                        onChangeText={setNewAdmin}
                    />
                    <TouchableOpacity onPress={handleAddAdmin}>
                        <Text style={styles.labelText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </CustomModal>
        )
    }

    async function logOut() {
        navigation.navigate('Loading')
        try {
            await SecureStore.deleteItemAsync("user");
        } catch (e) {
            navigation.navigate('Navigation')
            alert("Error logging out.");
        } finally {
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            })
            setUser(null);
        }
    }

    return (
        // Container
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <View style={styles.userInformationContainer}>
                    <View style={styles.profileIconContainer}>
                        {('photoUrl' in user && user.photoUrl) ? 
                            <Image source={{ uri: user.photoUrl }} style={styles.circle} />
                            :   
                            <View style={styles.circle}>
                                <Text style={{width: 100, textAlign: 'center'}}>Upload a photo below</Text>
                            </View>
                            }
                    </View>
                    <View style={styles.myProfileTextContainer}>
                        <Text style={styles.chooseHallText}>{user.username}</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <BigRectangleButton text='Change Name' onClick={() => setChangeNameModalVisible(true)} />
                    <ChangeNameModal />
                    <BigRectangleButton text='Change Password' onClick={() => setChangePasswordModalVisible(true)} />
                    <ChangePasswordModal />
                    <BigRectangleButton text='Change Profile Photo' onClick={() => setChangeProfilePhotoModalVisible(true)} />
                    <ChangeProfilePhotoModal />
                    <BigRectangleButton text='View My Reviews' onClick={() => viewUserReviews()} />
                    <BigRectangleButton text='Delete Account' onClick={() => setDeleteAccountModalVisible(true)} />
                    <DeleteAccountModal />
                    {
                        user.admin &&
                        <SmallRectangleButton text='Add Admin' onClick={() => setAddAdminModalVisible(true)} />
                    }
                    <AddAdminModal />
                </View>
                <View style={styles.logOutContainer}>
                    <Pressable style={styles.chooseHallText}
                        onPress={logOut}>
                        <Text style={styles.chooseHallText}>Log Out</Text>
                    </Pressable>
                </View>
                <Footer
                    leftButtonText={"Back"}
                    leftButtonPress={() => navigation.pop()}
                    iconButtonPress={() => navigation.navigate('Navigation')}
                    rightButtonText={"Review"}
                    rightButtonPress={() => navigation.navigate('Leave Review')}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B30738',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    myProfileTextContainer: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadText: {
        fontFamily: 'Bungee',
        color: "#B30738",
        fontSize: 40,
    },
    icon: {
        width: 100,
        height: 100,
        margin: 10,
    },
    chooseHallText: {
        fontFamily: 'Bungee',
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
    },
    buttonContainer: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileIconContainer: {
        marginTop: 60,
    },
    circle: {
        borderRadius: 75,
        borderColor: 'black',
        borderWidth: 2,
        width: 150,
        height: 150,
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logOutContainer: {
        marginTop: 30,
        flex: 0.3,
    },
    userInformationContainer: {
        flexDirection: 'row',
    },
    labelText: {
        fontFamily: 'Bungee',
        fontSize: 16,
        color: 'white',
        padding: 10,
    },
    input: {
        minWidth: 300,
        marginHorizontal: 10,
        marginVertical: 5,
        height: 40,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',
        padding: 10,
        color: 'white',
    },
});