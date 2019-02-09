import React from 'react';
import { Image, StatusBar, View, AsyncStorage, StyleSheet } from 'react-native';
import { Container, Content, Left, Right, Body, Icon, ListItem, Text, Button, Switch, Card, CardItem, } from 'native-base';
import { StackNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { onSignOut } from "../auth";

export default class SideBar extends React.Component {

    constructor(props){
        super(props);
    }

    render() {

    const { navigate } = this.props.navigasi;

        return (
            <Container style={{backgroundColor: '#E4F1F6'}}>
                <View style={{height: StatusBar.currentHeight, backgroundColor: 'blue'}}></View>
                <Content>
                    <Card>
                        <CardItem cardBody style={styles.header}>
                            <Image source={require('../images/logo.png')} style={{height: 200, width: null, flex: 1}}/>
                        </CardItem>
                    </Card>
                    <ListItem icon onPress={() => navigate('Biodata')}>
                        <Left>
                            <Button style={{ backgroundColor: "#007AFF" }}>
                                <Ionicons name="md-book" size={20} color="white" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Biodata Ibu dan Anak</Text>
                        </Body>
                        <Right/>
                    </ListItem>
                    <ListItem icon onPress={() => navigate('Timbang')}>
                        <Left>
                            <Button style={{ backgroundColor: "#007AFF" }}>
                                <Ionicons name="md-stats" size={20} color="white" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Tumbuh Kembang Anak</Text>
                        </Body>
                        <Right/>
                    </ListItem>
                    <ListItem icon onPress={() => navigate('Imunisasi')}>
                        <Left>
                            <Button style={{ backgroundColor: "#6cb15b" }}>
                                <Ionicons name="md-flask" size={20} color="white" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Imunisasi</Text>
                        </Body>
                        <Right/>
                    </ListItem>
                    <ListItem icon onPress={() => navigate('VitaminA')}>
                        <Left>
                            <Button style={{ backgroundColor: "#6cb15b" }}>
                                <Ionicons name="md-nutrition" size={20} color="white" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Vitamin A</Text>
                        </Body>
                        <Right/>
                    </ListItem>
                    <ListItem icon onPress={() => navigate('Kegiatan')}>
                        <Left>
                            <Button style={{ backgroundColor: "#007AFF" }}>
                                <Ionicons name="md-clipboard" size={20} color="white" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Agenda</Text>
                        </Body>
                        <Right/>
                    </ListItem>
                    <ListItem icon onPress={() => navigate('Profile')}>
                        <Left>
                            <Button style={{ backgroundColor: "#FF9501" }}>
                                <Ionicons name="md-lock" size={20} color="white" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Ubah Password</Text>
                        </Body>
                        <Right/>
                    </ListItem>
                    <ListItem icon onPress={() => onSignOut(navigate)}>
                        <Left>
                            <Button style={{ backgroundColor: "#ff0000" }}>
                                <Ionicons name="md-exit" size={20} color="white" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Logout</Text>
                        </Body>
                        <Right/>
                    </ListItem>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        height: 180
    }
});