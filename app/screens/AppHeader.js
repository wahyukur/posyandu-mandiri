import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { Header, Left, Body, Right, Text } from 'native-base';
import { onSignOut } from "../auth";
import { FontAwesome } from '@expo/vector-icons';
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

export const AppHeader = (props) => {

    const { navigate } = this.props.navigation;

    return (
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
                            <MenuOption text='About Us' />
                            <MenuOption onSelect={() => onSignOut(navigate)} text='Logout' />
                        </MenuOptions>
                    </Menu>
                </Right>
            </Header>
        </MenuProvider>
    );
}

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