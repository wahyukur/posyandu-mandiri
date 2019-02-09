import React from "react";
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, AsyncStorage, Image, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { onSignIn } from "../auth";

export default class SignIn extends React.Component {

    _isMounted = false;
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    render() {

        const { email, password } = this.state;
        const { navigate } = this.props.navigation;

        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={{height: StatusBar.currentHeight, backgroundColor: 'blue'}}></View>
                <Image style={{width:100, height: 100}} source={require('../images/logo.png')}/>
                <Text style={styles.logoText}>Posyandu Mandiri</Text>
                
                <TextInput style={styles.inputBox} 
                    underlineColorAndroid = 'rgba(0,0,0,0)'
                    placeholder           = "Email"
                    placeholderTexColor   = '#fff'
                    selectionColor        = '#fff'
                    keyboardType          = "email-address"
                    autoCapitalize        = 'none'
                    autoCorrect           = {false}
                    onSubmitEditing       = {()=> this.password.focus()} 
                    onChangeText          = { email => this.setState({email})} 
                    // value = 'user@user.com' 
                />
                <TextInput style={styles.inputBox}
                    underlineColorAndroid = 'rgba(0,0,0,0)'
                    placeholder           = "Password"
                    secureTextEntry       = {true}
                    placeholderTexColor   = "#fff"
                    ref                   = {(input) => this.password = input}
                    onChangeText          = { password => this.setState({password})} 
                    // value = 'user123'
                />
                <TouchableOpacity style={styles.button} onPress={() => {
                    onSignIn(email, password, navigate);
                }}>
                    <Text style={styles.buttonText}>Masuk</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#455a64',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText: {
        fontSize: 18,
        color: 'rgba(255, 255, 255, 0.7)',
        marginVertical: 15
    },
    inputBox: {
        width: 300,
        height: 55,
        backgroundColor: 'rgba(255, 255,255,0.2)',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 20,
        color: '#fff',
        marginVertical: 10
    },
    button: {
        width: 300,
        backgroundColor: '#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fff',
        textAlign: 'center'
    }
});