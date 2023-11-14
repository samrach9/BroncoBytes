import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Touchable } from 'react-native';
import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../App';
import { TopBar } from '../components/topBar';
import { Footer } from '../components/footer';
import login from '../api/login';
import SignUp from './signup';

export default function Login() {
    const navigation = useNavigation();
    const { user, setUser } = useContext(UserContext);
    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);

    const submitLogin = async () => {
        if (usernameOrEmail == "") {
            alert("Username/email cannot be empty.");
            return;
        }

        if (password == "") {
            alert("Password cannot be empty.");
            return;
        }

        const hashedPassword = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password + process.env.EXPO_PUBLIC_SALT);

        let tempUser = {
            password: hashedPassword,
        }
        const emailRegex = /\S+@\S+\.\S+/;
        if (emailRegex.test(usernameOrEmail)) {
            tempUser['email'] = usernameOrEmail;
        } else {
            tempUser['username'] = usernameOrEmail;
        }

        navigation.replace('Loading')
        const result = await login(tempUser);

        if ("error" in result) {
            navigation.replace('Login')
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

    const navigateToSignUpPage = () => {
        navigation.reset(
            {
                index: 1,
                routes: [{ name: 'Login' }, { name: 'Sign Up'}],
            }
        )
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView style={styles.content} behavior='position' keyboardVerticalOffset={-10}>
                <View style={styles.createOneContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>Don't have an</Text>
                        <Text style={styles.headerText}>Account?</Text>
                    </View>
                    <TouchableOpacity style={styles.createOneButton} onPress={navigateToSignUpPage}> 
                        <Text style={styles.createOneText}>Create One</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.subHeaderContainer}>
                    <Text style={styles.headerText}>Login</Text>
                    <Text style={styles.generalText}>Enter your school email</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setUsernameOrEmail(text)}
                        value={usernameOrEmail}
                        autoCorrect={false}
                        autoComplete='username'
                        autoCapitalize='none'
                        keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                    />
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry={!passwordShown}
                        value={password}
                        autoCorrect={false}
                        autoComplete='password'
                        autoCapitalize='none'
                        keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                    />
                    <TouchableOpacity style={styles.showPass} onPress={() => setPasswordShown(!passwordShown)}>
                        <Text style={styles.label}>{passwordShown ? "Hide Password" : "Show Password"}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.letsGoContainer}>
                    <TouchableOpacity style={styles.login} onPress={submitLogin}>
                        <Text style={styles.loginText}>Let's Go!</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#B30738',
        flex: 1,
    },
    label: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'Bungee',
        marginLeft: 12,
    },
    input: {
        height: 60,
        width: 250,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color: 'white',
        borderColor: 'white',
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    showPass: {
        marginBottom: 10,
    },
    login: {
        alignItems: "center",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 25,
        width: 250,
    },
    loginText: {
        color: "#B30738",
        fontFamily: "Bungee",
        fontSize: 20,
        padding: 7,
    },
    headerText: {
        fontFamily: 'Bungee',
        color: 'white',
        fontSize: 36,
    },
    headerContainer: {
        alignItems: 'center',
    },
    createOneText: {
        color: "#B30738",
        fontFamily: "Bungee",
        fontSize: 20,
        padding: 7,
        textAlign: 'center',
    },
    createOneButton: {
        alignItems: "center",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 25,
        width: 250,
        margin: 20,

    },
    createOneContainer: {
        alignItems: 'center',
    },
    subHeaderContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    generalText: {
        fontFamily: 'Bungee',
        fontSize: 16,
        color: 'white',
        margin: 20,
    },
    inputContainer: {
        justifyContent: 'center',
    },
    letsGoContainer: {
        alignItems: 'center',
        margin: 20,
    },
});