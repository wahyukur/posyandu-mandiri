import { AppLoading, LinearGradient } from "expo";
import React from 'react';
import { StyleSheet, Image, View, StatusBar, ListView, AsyncStorage, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { Container, Content, Header, Left, Right, Body, Icon, Text, Button, List, ListItem, Thumbnail, Title, Card, CardItem, Separator } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Ionicons } from '@expo/vector-icons';

export default class DetailTimbang extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id_anak: this.props.navigation.state.params.p_id_anak,
            detailTimbang: {},
            isReady: false,
        };
    }

    async componentWillMount () { 
        try { 
            // console.log(this.state.id_anak);
            await fetch('https://posyandumandiri.000webhostapp.com/api/getDetailTimbang/'+this.state.id_anak, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((res) => {
                // console.log(res);
                if (res) {
                    this.setState({
                        detailTimbang: res
                    });
                    // console.log(this.state.detailTimbang);
                } else {
                    alert("Error Load Data");
                }
            })
            .catch((error) => {
                console.error(error);
            });
            await Expo.Font.loadAsync({
                Arial: require("native-base/Fonts/arial.ttf"),
                Roboto: require("native-base/Fonts/Roboto.ttf"),
                Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
                Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
            });
            this.setState({isReady: true});
        } catch (error) { 
            console.log(error); 
        }
    }

    render() {
        if (!this.state.isReady) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        }

        return (
            <Container>
                <View style={{height: StatusBar.currentHeight, backgroundColor: 'gray'}}></View>
                <Header style={{backgroundColor: '#347B98'}}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{color:'white'}}>History Timbang</Text>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Ionicons name="md-stats" size={20} color="white" />
                        </Button>
                    </Right>
                </Header>
                <Content style={{flex:1, backgroundColor: '#E4F1F6'}}>
                <View>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{flex:1, alignItems: 'center'}}>
                            <Text>Tanggal</Text>
                        </View>
                        <View style={{flex:1, alignItems: 'center'}}>
                            <Text>Berat</Text>
                        </View>
                        <View style={{flex:1, alignItems: 'center'}}>
                            <Text>Tinggi</Text>
                        </View>
                        <View style={{flex:1, alignItems: 'center'}}>
                            <Text>Status</Text>
                        </View>
                    </View>
                    <List>
                    <FlatList 
                        data={this.state.detailTimbang} 
                        renderItem={({item}) => 
                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                <View style={{flex:1, alignItems: 'center'}}>
                                    <Text>{item.tgl_timbang}</Text>
                                </View>
                                <View style={{flex:1, alignItems: 'center'}}>
                                    <Text>{item.berat_badan} Kg</Text>
                                </View>
                                <View style={{flex:1, alignItems: 'center'}}>
                                    <Text>{item.tinggi_badan} cm</Text>
                                </View>
                                <View style={{flex:1, alignItems: 'center'}}>
                                    <Text>{item.status_gizi}</Text>
                                </View>
                            </View>
                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
                    </List>
                </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});