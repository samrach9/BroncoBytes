import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Button, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FoodContext } from '../App';
import * as Crypto from 'expo-crypto';
import { Footer } from '../components/footer';
import { BigRectangleButton } from '../components/bigRectangleButton';
import { UserContext } from '../App';
import * as SecureStore from 'expo-secure-store';
import { CustomModal } from '../components/customModal';
import updateUser from '../api/updateUser';
import removeUser from '../api/removeUser';

// options shift f
export default function Navigation() {

    const navigation = useNavigation();
    const { user, setUser } = useContext(UserContext);
    const [changeNmeModalVisible, setChangeNameModalVisible] = useState(false);
    const [changePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
    const [changeProfilePhotoModalVisible, setChangeProfilePhotoModalVisible] = useState(false);
    const [deleteAccountModalVisible, setDeleteAccountModalVisible] = useState(false);

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

    function DeleteAccountModal() {
        const [password, setPassword] = useState('');

        const handleDeleteAccount = async () => {
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

    const logOut = async () => {
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
                        <Text style={styles.circle}></Text>
                    </View>
                    <View style={styles.myProfileTextContainer}>
                        <Text style={styles.chooseHallText}>{user.username}</Text>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <BigRectangleButton text='Change Name' onClick={() => setChangeNameModalVisible(true)} />
                    <ChangeNameModal/>
                    <BigRectangleButton text='Change Password' onClick={() => setChangePasswordModalVisible(true)} />
                    <ChangePasswordModal/>
                    <BigRectangleButton text='Edit Profile Photo' onClick={() => setChangeProfilePhotoModalVisible(true)} />
                    <BigRectangleButton text='View My Reviews' onClick={() => navigation.navigate('Navigation')} />
                    <BigRectangleButton text='Delete Account' onClick={() => setDeleteAccountModalVisible(true)} />
                    <DeleteAccountModal/>
                </View>
                <View style={styles.logOutContainer}>
                    <Pressable style={styles.chooseHallText}
                        onPress={logOut}>
                        <Text style={styles.chooseHallText}>Log Out</Text>
                    </Pressable>
                </View>
                <Footer
                    leftButtonText={"Back"}
                    leftButtonPress={() => navigation.navigate('Choose Hall')}
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
        alignItems: 'flex-start',
    },
    circle: {
        borderRadius: '75%',
        borderColor: 'black',
        borderWidth: 2,
        width: 150,
        height: 150,
        marginBottom: 30,
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