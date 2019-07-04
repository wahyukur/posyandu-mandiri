import { Permissions, Notifications } from "expo";
import React from "react";
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, AsyncStorage, Image, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { onSignIn } from "../auth";

export default class SignIn extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            token: '',
            auth: ''
        }
    }

    async componentDidMount(){
        try {
            var data = await AsyncStorage.getItem('auth');
            data = JSON.parse(data);
            this.setState({
                auth: data
            });
            // console.log(this.state.auth);
            this.registerForPushNotificationsAsync();
        } catch (error) {
            console.log(error);
        }
    }

    async registerForPushNotificationsAsync() {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            return;
        }

        let token = await Notifications.getExpoPushTokenAsync();
        // console.log('tokennya = ', token);
        this.setState({
            token: token
        });
    }

    render() {

        const { email, password, token } = this.state;
        const { navigate } = this.props.navigation;

        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={{height: StatusBar.currentHeight, backgroundColor: 'blue'}}></View>
                <Image style={{width:100, height: 100, marginBottom: 30, borderRadius: 60, borderWidth: 3, borderColor:"#fff",}} source={require('../images/icon.png')}/>
                
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
                    onSignIn(email, password, token, navigate);
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
        backgroundColor: '#2980b9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText: {
        fontSize: 18,
        color: '#000',
        marginVertical: 15
    },
    inputBox: {
        width: 300,
        height: 55,
        backgroundColor: '#34495e',
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