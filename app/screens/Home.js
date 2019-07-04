import { Font, AppLoading } from "expo";
import React from 'react';
import { View, Image, StatusBar, StyleSheet, ScrollView, AsyncStorage, FlatList, RefreshControl, Dimensions, TouchableHighlight, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Button, Icon, Left, Body, Right, Title, Text, Card, CardItem, List, ListItem, Thumbnail, Separator, Spinner } from 'native-base';
import Swiper from 'react-native-swiper';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            auth: '',
            isLoading: false,
            refreshing: false,
            isError: false
        };
    }

    async componentDidMount(){
        try {
            var data = await AsyncStorage.getItem('auth');
            data = JSON.parse(data);
            this.setState({
                auth: data
            });
            console.log(this.state.auth);
            this.makeRemoteRequest();
        } catch (error) {
            console.log(error);
        }
    }

    makeRemoteRequest(){
        this.setState({
            isLoading: true
        });
        // console.log(this.state.auth.id);
        fetch('https://posyandumandiri.000webhostapp.com/api/getID/'+this.state.auth.id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((res) => {
            // console.log(res);
            this.setState({
                data: res,
                refreshing: false,
                isLoading: false,
                isError: false
            });
            // console.log(this.state.data);
        })
        .catch((error) => {
            this.setState({
                refreshing: false,
                isLoading: false,
                isError: true
            });
            alert("Error Load Data");
        });
    }

    handleRefresh() {
        this.setState({
            refreshing:true,
        }, function () {
            this.makeRemoteRequest();
        })
    }

    renderHeader(){
        return (
            <Separator bordered>
                <Text>Progres Anak</Text>
            </Separator>
        );
    }

    renderEmpty(){
        if(this.state.isError == false) {return null};
        return (
            <View style={{flex:1,paddingVertical: 5,alignItems:'center',height:100}}>
                <Text style={{marginTop:10,color:'#636e72'}}>Tarik ke bawah untuk refresh</Text>
                <FontAwesome name="angle-double-down" size={30} color='#636e72' />
            </View>
        );
    }

    renderFooter(){
        if(this.state.isLoading == false) {return null};
        return (
            <View style={{
                paddingVertical: 5,
            }}>
                <Spinner color='black' />
            </View>
        );
    }

    DetailAnak=(id_anak,nama_anak,tgl_lhr,umur,jenis_kel)=>{
        this.props.navigation.navigate('Drawer', { 
            p_id_anak : id_anak,
            p_nama_anak : nama_anak,
            p_tgl_lhr : tgl_lhr,
            p_umur : umur,
            p_jenis_kel : jenis_kel
        });
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <Container>
                <View style={{height: StatusBar.currentHeight, backgroundColor: 'grey'}}></View>
                <Header style={{ backgroundColor:'#67AFCB' }}>
                    <Left></Left>
                    <Body></Body>
                    <Right></Right>
                </Header>
                <Content style={{backgroundColor: '#E4F1F6'}}>
                    <View style={{flex:1}}>
                        <Swiper style={styles.wrapper} showsButtons={false} autoplay autoplayTimeout={4}>
                            <Image source={require('../images/penyuluhan.jpeg')} style={styles.slide} />
                            <Image source={require('../images/pmt.jpeg')} style={styles.slide} />
                        </Swiper>
                    </View>
                    
                    <List>
                        <FlatList 
                            data={this.state.data} 
                            renderItem={({item}) => 
                                <ListItem avatar onPress={this.DetailAnak.bind(this, item.id_anak, item.nama_anak, item.tgl_lhr, item.umur, item.jenis_kel, this.props.navigation.navigate)}>
                                    <Left>
                                        {item.jenis_kel == 0? <Thumbnail small source={require('../images/russell-small.png')} /> : <Thumbnail small source={require('../images/liz_small1.png')} />}
                                    </Left>
                                    <Body>
                                        <Text>{item.nama_anak}</Text>
                                        <Text note>Usia {item.umur} Bulan</Text>
                                    </Body>
                                    <Right>
                                        <Button transparent >
                                            <Icon name="arrow-forward" />
                                        </Button>
                                    </Right>
                                </ListItem>
                            }
                            refreshControl={
                                <RefreshControl 
                                    refreshing={this.state.refreshing} 
                                    onRefresh={this.hendleRefresh}
                                />
                            }
                            keyExtractor={(item, index) => index.toString()} 
                            ListHeaderComponent={this.renderHeader.bind(this)} 
                            ListEmptyComponent={this.renderEmpty.bind(this)} 
                            ListFooterComponent={this.renderFooter.bind(this)}
                        />
                    </List>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    wrapper: {
        height: 225
    },
    slide: {
        flex: 1,
        resizeMode: 'stretch',
        width: null
    }
});
