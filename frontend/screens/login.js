import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../App';
import { TopBar } from '../components/topBar';
import { Footer } from '../components/footer';
import login from '../api/login';

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
                    routes: [{ name: 'Home' }],
                }
            )
        }
    }

    return (
        <View style={styles.container}>
            <TopBar text={"Login"} />
            <KeyboardAvoidingView style={styles.content} behavior='position' keyboardVerticalOffset={-10}>
                <Text style={styles.label}>Username or Email</Text>
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
                <TouchableOpacity style={styles.login} onPress={submitLogin}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            <Footer
                leftButtonText={""}
                leftButtonPress={() => {}}
                rightButtonText={"Sign Up"}
                rightButtonPress={() => navigation.navigate('Sign Up')}
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
    login: {
        alignItems: "center",
        backgroundColor: "white",
        padding: 10,
    },
    loginText: {
        color: "#B30738",
        fontFamily: "Bungee",
        fontSize: 20,
    }
});