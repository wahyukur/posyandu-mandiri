import { AppLoading } from "expo";
import React from 'react';
import { StyleSheet, Image, View, StatusBar, ListView, AsyncStorage, ScrollView, FlatList } from 'react-native';
import { Container, Content, Header, Left, Right, Body, Icon, Text, Button, List, ListItem, Thumbnail, Title, Card, CardItem, Separator } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';

export default class VitaminA extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id_anak: this.props.navigation.state.params.p_id_anak,
            nama_anak: this.props.navigation.state.params.p_nama_anak,
            umur: this.props.navigation.state.params.p_umur,
            tgl_lhr: this.props.navigation.state.params.p_tgl_lhr,
            jenis_kel: this.props.navigation.state.params.p_jenis_kel,
            dataVit: {},
            isReady: true
        };
    }

    componentDidMount(){
        try {
            fetch('https://posyandumandiri.000webhostapp.com/api/getVitA/'+this.state.id_anak, {
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
                        dataVit: res
                    });
                    // console.log(this.state.dataVit);
                } else {
                    alert("Error Load Data");
                }
            })
            .catch((error) => {
                console.error(error);
            });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        if (!this.state.isReady) {
            return (
                <AppLoading />
            );
        }

        if (this.state.jenis_kel == 0) {
            var src = require('../images/russell-small.png')
        } else {
            var src = require('../images/liz_small1.png')
        }

        return (
            <Container>
                <View style={{height: StatusBar.currentHeight, backgroundColor: 'gray'}}></View>
                <Header style={{backgroundColor: '#67AFCB'}}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{color:'white'}}>Vitamin A</Text>
                    </Body>
                    <Right></Right>
                </Header>
                <Content style={{backgroundColor: '#E4F1F6'}}>
                    <View style={styles.nameBox}>
                        <View style={{flex: 1, height:50, flexDirection: 'row', backgroundColor:'white'}}>
                            <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}>
                                <Thumbnail small square source={src} />
                            </View>
                            <View style={{flex:3, justifyContent: 'center'}}>
                                <Text>{this.state.nama_anak}</Text>
                            </View>
                            <View style={{flex:2, justifyContent:'center'}}>
                                <Text>Usia {this.state.umur} Bulan</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{flex: 1, flexDirection: 'row', height:40, paddingTop:2, borderBottomWidth:1, borderBottomColor:'#95afc0'}}>
                        <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}>
                            <Text>Umur (Bulan)</Text>
                        </View>
                        <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}>
                            <Text>Vitamin A (<FontAwesome name='circle' color='blue' />)</Text>
                        </View>
                        <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}>
                            <Text>Vitamin A (<FontAwesome name='circle' color='red' />)</Text>
                        </View>
                    </View>
                    <List>
                        <FlatList 
                            data={this.state.dataVit} 
                            renderItem={({item}) => 
                                <View style={{flex: 1, flexDirection: 'row', height:40, paddingTop:2}}>
                                    <View style={{flex:1, alignItems: 'center', justifyContent:'center', borderRightColor:'#95afc0', borderRightWidth:1}}>
                                        <Text style={styles.note}>{item.umur} Bulan</Text>
                                    </View>

                                    <View style={{flex:1, alignItems: 'center', justifyContent:'center', borderRightColor:'#95afc0', borderRightWidth:1}}>
                                        {item.ket == 0? <Text style={styles.note}>{item.tgl_vitA}</Text>: <Text style={styles.note}>--</Text>}
                                    </View>

                                    <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}>
                                        {item.ket == 1? <Text style={styles.note}>{item.tgl_vitA}</Text>: <Text style={styles.note}>--</Text>}
                                    </View>
                                </View>
                            }
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </List>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    note:{
        color: '#1A3E4C',
        fontSize: 13,
        textAlign:'center'
    }
});