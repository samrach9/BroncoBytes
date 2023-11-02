import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../App';
import { TopBar } from '../components/topBar';
import { Footer } from '../components/footer';
import signup from '../api/signup';

export default function SignUp() {
    const navigation = useNavigation();
    const { user, setUser } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);

    const submitSignup = async () => {
        if (username == "") {
            alert("Username cannot be empty.");
            return;
        }
        if (email == "") {
            alert("Email cannot be empty.");
            return;
        }
        if (password == "") {
            alert("Password cannot be empty.");
            return;
        }
        
        const emailRegex = /\S+@\S+\.\S+/;
        if (emailRegex.test(username)) {
            alert("Username cannot be an email address.");
            return;
        }
        
        if (!emailRegex.test(email)) {
            alert("Invalid email address.");
            return;
        } else if (email.split("@")[1] != "scu.edu") {
            alert("Email address must be an SCU email address.");
            return;
        }
        
        const hashedPassword = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256, password + process.env.EXPO_PUBLIC_SALT);

        tempUser = {
            username: username,
            email: email.toLocaleLowerCase(),
            password: hashedPassword,
        }

        navigation.reset(
            {
                index: 0,
                routes: [{ name: 'Loading' }],
            }
        )

        const result = await signup(tempUser);

        if ("error" in result) {
            navigation.reset(
                {
                    index: 1,
                    routes: [{ name: 'Login' }, { name: 'Sign Up'}],
                }
            )
            alert(result.error);
        } else {
            setUser(result.user);
            await SecureStore.setItemAsync("user", JSON.stringify(result.user));
            navigation.reset(
                {
                    index: 0,
                    routes: [{ name: 'Navigation' }],
                }
            )
        }
    }

    return (
        <View style={styles.container}>
            <TopBar text={"Signup"} />
            <KeyboardAvoidingView style={styles.content} behavior='position' keyboardVerticalOffset={-50}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setUsername(text)}
                    value={username}
                    autoComplete='off'
                    autoCapitalize='none'
                    autoCorrect={false}
                    keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                />
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setEmail(text)}
                    value={email}
                    autoComplete='email'
                    autoCorrect={false}
                    autoCapitalize='none'
                    keyboardType='email-address'
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={!passwordShown}
                    value={password}
                    autoCapitalize='none'
                    autoComplete='new-password'
                    autoCorrect={false}
                />
                <TouchableOpacity style={styles.showPass} onPress={() => setPasswordShown(!passwordShown)}>
                    <Text style={styles.label}>{passwordShown ? "Hide Password" : "Show Password"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signup} onPress={submitSignup}>
                    <Text style={styles.signupText}>Sign Up</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            <Footer
                leftButtonText={""}
                leftButtonPress={() => {}}
                rightButtonText={"Login"}
                rightButtonPress={() => navigation.navigate('Login')}
            />
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
    label: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'Bungee',
        textAlign: 'center',
    },
    input: {
        height: 40,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color: 'white',
        borderColor: 'white',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
    },
    showPass: {
        marginBottom: 10,
    },
    signup: {
        alignItems: "center",
        backgroundColor: "white",
        padding: 10,
    },
    signupText: {
        color: "#B30738",
        fontFamily: "Bungee",
        fontSize: 20,
    }
});