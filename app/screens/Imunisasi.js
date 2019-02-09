import { AppLoading } from "expo";
import React from 'react';
import { StyleSheet, Image, View, StatusBar, ListView, AsyncStorage, ScrollView, FlatList, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Container, Content, Header, Left, Right, Body, Icon, Text, Button, List, ListItem, Thumbnail, Title, Card, CardItem, Separator } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { Col, Row, Grid } from 'react-native-easy-grid';

const { height } = Dimensions.get('window');

export default class Imunisasi extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id_anak: this.props.navigation.state.params.p_id_anak,
            nama_anak: this.props.navigation.state.params.p_nama_anak,
            umur: this.props.navigation.state.params.p_umur,
            tgl_lhr: this.props.navigation.state.params.p_tgl_lhr,
            jenis_kel: this.props.navigation.state.params.p_jenis_kel,
            dataImun:{},
            j_Imun:{},
            isReady: false
        };
    }

    async componentWillMount () { 
        // console.log(this.state.id_anak);
        try { 
            await fetch('https://posyandumandiri.000webhostapp.com/api/getImunisasi/'+this.state.id_anak, {
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
                        j_Imun: res
                    });
                    // console.log(this.state.j_Imun);
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
            this.setState({ isReady: true });
        } catch (error) { 
            console.log(error);
        }
    }

    // DetailTbg=(id_anak)=>{
    //     this.props.navigation.navigate('DetailTimbang', { 
    //         p_id_anak : id_anak
    //     });
    // }

    renderGroup = (group) => {
        if(group.imun) {
            return (
                <View>
                    {group.imun.map((imun, key) => {
                        // console.log(imun);
                        if (imun.indikasi === 1) {
                            var icon_name = 'check';
                        } else {
                            var icon_name = 'circle';
                        }
                        return (
                            <View key={key}>
                                <Card>
                                    <CardItem>
                                        <View style={{flex:1,flexDirection:'row'}}>
                                            <View>
                                                <FontAwesome name={icon_name} color='grey' size={20} />
                                            </View>
                                            <View style={{flex:1}}>
                                                <Text style={{paddingLeft:15}}>{imun.nama_imun}</Text>
                                            </View>
                                        </View>
                                    </CardItem>
                                </Card>
                            </View>
                        );
                    })}
                </View>
            );
        }
        return null;
    }

    render() {
        if (!this.state.isReady) {
            return (
                <View style={styles.activity}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
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
                        <Text style={{color:'white'}}>Imunisasi</Text>
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
                    <View style={{marginTop:3, height:height}}>
                        <FlatList 
                            data={this.state.j_Imun} 
                            extraData={this.state}
                            ItemSeparatorComponent={() => {
                                return (
                                    <View style={styles.separator}/>
                                )
                            }}
                            keyExtractor={(item)=>{
                                return item.umur;
                            }}
                            renderItem={(item) => {
                                const Group = item.item;
                                return(
                                    <View style={{flex: 1,flexDirection: 'row'}}>
                                        <View style={{flex:1, margin:5}}>
                                            <Text>{Group.umur} Bulan</Text>
                                        </View>
                                        <View style={{flex:2}}>
                                            {this.renderGroup(Group)}
                                        </View>
                                    </View>
                                );
                            }}
                        />
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#FFFFFF"
    },
    container: {
        padding: 16,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: "#FFFFFF",
        alignItems: 'flex-start'
    },
    avatar: {
        width:55,
        height:55,
        borderRadius:25,
    },
    text: {
        marginBottom: 5,
        flexDirection: 'row',
        flexWrap:'wrap'
    },
    content: {
        flex: 1,
        marginLeft: 16,
        marginRight: 0
    },
    mainContent: {
        marginRight: 60
    },
    memberImage: {
        height: 30,
        width: 30,
        marginRight:4,
        borderRadius:10,
    },
    separator: {
        height: 1,
        backgroundColor: "#CCCCCC"
    },
    countMembers:{
        color:"#20B2AA"
    },
    timeAgo:{
        fontSize:12,
        color:"#696969"
    },
    groupName:{
        fontSize:23,
        color:"#1E90FF"
    },
    groupMembersContent:{
        flexDirection:'row',
        marginTop:10
    },
    activity: {
        flex: 1,
        justifyContent: 'center'
    },
    nameBox:{
        flex:1, 
        paddingTop:5
    }
});   