import { AppLoading } from "expo";
import React from 'react';
import { StyleSheet, Image, View, StatusBar, TextInput, TouchableOpacity, AsyncStorage, ActivityIndicator } from 'react-native';
import { Container, Content, Header, Left, Right, Body, Text, Button } from 'native-base';
import PasswordInputText from 'react-native-hide-show-password-input';
import { FontAwesome } from '@expo/vector-icons';
import { onSignOut } from "../auth";
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
            oldPassword:'',
            newPassword:'',
            confirmPassword:'',
            auth: {},
            hidePassword: true,
            hidePassword1: true,
            hidePassword2: true
        };
    }

    async componentDidMount () { 
        try { 
            var data = await AsyncStorage.getItem('auth');
            data = JSON.parse(data);
            this.setState({
                auth: data,
                isReady: true
            });
        } catch (error) { 
            // console.log(error);
            alert("Error Load Data");
        }
    }

    managePasswordVisibility = () => {
        this.setState({ hidePassword: !this.state.hidePassword });
    }

    managePasswordVisibility1 = () => {
        this.setState({ hidePassword1: !this.state.hidePassword1 });
    }

    managePasswordVisibility2 = () => {
        this.setState({ hidePassword2: !this.state.hidePassword2 });
    }

    postProfile = (oldPassword,newPassword,confirmPassword) => {
        // console.log(this.state.oldPassword,this.state.newPassword,this.state.confirmPassword)
        fetch('https://posyandumandiri.000webhostapp.com/api/postProfile/'+this.state.auth.id, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                oldPassword: oldPassword,
                newPassword: newPassword,
                confirmPassword: confirmPassword
            })
        })
        .then((response) => response.json())
        .then((res) => {
            console.log(res);
            if (res.success === true) {
                alert(res.message);
            } else {
                alert(res.message);
            }
        })
        .catch((error) => {
            // console.error(error);
            alert(res.message);
        });
    }

    render() {
        if (!this.state.isReady) {
            return (
                <View style={styles.activity}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        }

        const { navigate } = this.props.navigation;

        return (
            <Container>
                <View style={{height: StatusBar.currentHeight, backgroundColor: 'grey'}}></View>
                <MenuProvider>
                    <Header style={{ backgroundColor:'#67AFCB' }}>
                        <Left></Left>
                        <Body></Body>
                        <Right>
                            <Menu>
                                <MenuTrigger>
                                    <View style={{paddingLeft:15, paddingRight:15, paddingTop:5, paddingBottom:5}}>
                                        <Text>
                                            <FontAwesome name="ellipsis-v" size={25} color="white" />
                                        </Text>
                                    </View>
                                </MenuTrigger>
                                <MenuOptions customStyles={optionsStyles}>
                                    <MenuOption onSelect={() => onSignOut(navigate)} text='Logout' />
                                </MenuOptions>
                            </Menu>
                        </Right>
                    </Header>
                    <Content style={{backgroundColor: '#E4F1F6'}}>
                        <View style={{flexDirection:'row', margin:10}}>
                            <View>
                                <Image style={styles.avatar} source={{uri: "https://bootdey.com/img/Content/avatar/avatar5.png"}}/>
                            </View>
                            <View style={{justifyContent:'center', marginLeft: 8}}>
                                <Text style={styles.name}>{this.state.auth.nama}</Text>
                                <Text style={styles.email}>{this.state.auth.email}</Text>
                            </View>
                        </View>

                        <View style={styles.card}>
                            <View style={{flex:1}}>
                                <Text style={{fontSize:12, color:'#67AFCB', marginLeft:10}}>Password Lama</Text>
                                <View style = { styles.textBoxBtnHolder }>
                                    <TextInput 
                                        underlineColorAndroid = "transparent" 
                                        secureTextEntry = { this.state.hidePassword } 
                                        style = { styles.textBox } 
                                        onChangeText = { oldPassword => this.setState({oldPassword})}
                                    />
                                    <TouchableOpacity activeOpacity = { 0.8 } style = { styles.visibilityBtn } onPress = { this.managePasswordVisibility }>
                                        <Image source = { ( this.state.hidePassword ) ? require('../images/icon/hide.png') : require('../images/icon/show.png') } style = { styles.btnImage } />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.card}>
                            <View style={{flex:1}}>
                                <Text style={{fontSize:12, color:'#67AFCB', marginLeft:10}}>Password Baru</Text>
                                <View style = { styles.textBoxBtnHolder }>
                                    <TextInput 
                                        underlineColorAndroid = "transparent" 
                                        secureTextEntry = { this.state.hidePassword1 } 
                                        style = { styles.textBox }
                                        onChangeText = { newPassword => this.setState({newPassword})}
                                    />
                                    <TouchableOpacity activeOpacity = { 0.8 } style = { styles.visibilityBtn } onPress = { this.managePasswordVisibility1 }>
                                        <Image source = { ( this.state.hidePassword1 ) ? require('../images/icon/hide.png') : require('../images/icon/show.png') } style = { styles.btnImage } />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.card}>
                            <View style={{flex:1}}>
                                <Text style={{fontSize:12, color:'#67AFCB', marginLeft:10}}>Konfirmasi Password</Text>
                                <View style = { styles.textBoxBtnHolder }>
                                    <TextInput 
                                        underlineColorAndroid = "transparent" 
                                        secureTextEntry = { this.state.hidePassword2 } 
                                        style = { styles.textBox }
                                        onChangeText = { confirmPassword => this.setState({confirmPassword})}
                                    />
                                    <TouchableOpacity activeOpacity = { 0.8 } style = { styles.visibilityBtn } onPress = { this.managePasswordVisibility2 }>
                                        <Image source = { ( this.state.hidePassword2 ) ? require('../images/icon/hide.png') : require('../images/icon/show.png') } style = { styles.btnImage } />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <Button full style={{marginTop:10,backgroundColor:'#1c313a',margin:5}} onPress={this.postProfile.bind(this, this.state.oldPassword, this.state.newPassword, this.state.confirmPassword)}>
                            <Text style={styles.buttonText}>Update Password</Text>
                        </Button>
                    </Content>
                </MenuProvider>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    avatar: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderColor: "white",
        alignSelf:'center'
    },
    card:{
        backgroundColor: "#FFFFFF",
        padding:10,
        marginTop:10,
        flexDirection:'row'
    },
    textBoxBtnHolder:{
        position: 'relative',
        alignSelf: 'stretch',
        justifyContent: 'center',
        marginTop: 10
    },
    textBox:{
        fontSize: 18,
        alignSelf: 'stretch',
        height: 45,
        paddingRight: 45,
        paddingLeft: 8,
        borderWidth: 1,
        paddingVertical: 0,
        borderColor: 'grey',
        borderRadius: 5
    },
    visibilityBtn:{
        position: 'absolute',
        right: 3,
        height: 40,
        width: 35,
        padding: 5
    },
    btnImage:{
        resizeMode: 'contain',
        height: '100%',
        width: '100%'
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
    },
    name:{
        fontSize:20
    },
    activity: {
        flex: 1,
        justifyContent: 'center'
    },
    email:{
        fontSize:15,
        fontStyle:'italic',
        color:'grey'
    }
});

const optionsStyles = {
    optionsContainer: {
        backgroundColor: 'white',
        padding: 0,
    },
    optionsWrapper: {
        backgroundColor: 'white'
    },
    optionWrapper: {
        backgroundColor: 'white',
        margin: 0
    },
    optionTouchable: {
        underlayColor: 'gold',
        activeOpacity: 70
    },
    optionText: {
        color: 'black'
    },
};