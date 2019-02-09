import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity, AsyncStorage, Image, StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    componentWillMount(){
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {
        var value = AsyncStorage.getItem('auth');
        console.log(value);
        if(value !== null){
            this.props.navigation.navigate('Profile');
        }
    }

    render() {
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
                    onChangeText          = {(text)=>this.setState({email: text})} 
                    value                 = {this.state.email}
                />
                <TextInput style={styles.inputBox}
                    underlineColorAndroid = 'rgba(0,0,0,0)'
                    placeholder           = "Password"
                    secureTextEntry       = {true}
                    placeholderTexColor   = "#fff"
                    ref                   = {(input) => this.password = input}
                    onChangeText          = {(text)=>this.setState({password: text})} 
                    value                 = {this.state.password}
                />
                <TouchableOpacity style={styles.button} onPress={this.login}>
                    <Text style={styles.buttonText}>Masuk</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }

    login = () => {
        // alert('test');
        // alert(this.state.username);
        fetch('https://posyandumandiri.000webhostapp.com/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            })
        })
        .then((response) => response.json())
        .then((res) => {
            // console.log(res);
            if (res.success === true) {
                AsyncStorage.setItem('auth', JSON.stringify(res));
                this.props.navigation.navigate('Profile');
            } else {
                alert(res.message);
            }
        })
        .done();
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