import React from 'react';
import { StyleSheet, Image, View, StatusBar, ListView, AsyncStorage, ScrollView, FlatList, SectionList, PixelRatio, Dimensions, ActivityIndicator } from 'react-native';
import { Container, Content, Header, Left, Right, Body, Icon, Text, Button, List, ListItem, Thumbnail, Title, Card, CardItem, Separator, ActionSheet, Root } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import PureChart from 'react-native-pure-chart';

export default class Timbang extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id_anak: this.props.navigation.state.params.p_id_anak,
            nama_anak: this.props.navigation.state.params.p_nama_anak,
            umur: this.props.navigation.state.params.p_umur,
            tgl_lhr: this.props.navigation.state.params.p_tgl_lhr,
            jenis_kel: this.props.navigation.state.params.p_jenis_kel,
            isReady: false,
            dataAnak: {},
            dataTbg: {},
            grafik: [],
        };
    }

    componentDidMount () { 
        fetch('https://posyandumandiri.000webhostapp.com/api/getTimbang/'+this.state.id_anak, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((res) => {
            console.log(res);
            this.setState({
                dataAnak: res.dataAnak,
                dataTbg: res.dataTbg,
                grafik: res.grafik,
                isReady: true
            });
            // console.log(this.state.dataAnak.nama_anak);
        })
        .catch((error) => {
            // console.error(error);
            alert("Error Load Data");
        });
    }

    render() {
        if (!this.state.isReady) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        }

        if (this.state.jenis_kel == 0) {
            var src = require('../images/russell-small.png')
            var data = [
                {
                    seriesName: 'BB Lebih', 
                    data: [5.0,6.5,7.9,8.9,9.6,10.3,10.9,11.3,11.8,12.2,12.5,12.9,13.2,13.5,13.8,14.2,14.5,14.8,15.1,15.4,15.7,16.0,16.3,16.6,16.9,17.2,17.5,17.9,18.2,18.4,18.8,19.0,19.3,19.6,19.9,20.2,20.4,20.7,21.0,21.2,21.5,21.8,22.1,22.4,22.6,22.9,23.2,23.5,23.8,24.1,24.3,24.6,24.9,25.2,25.5,25.8,26.1,26.4,26.7,27.0,27.3,], 
                    color: '#f2f200'
                },
                {
                    seriesName: 'BB Normal', 
                    data: [4.4,5.8,7.1,8.0,8.7,9.3,9.8,10.3,10.7,11.0,11.4,11.7,12.0,12.3,12.6,12.8,13.1,13.4,13.6,13.9,14.2,14.4,14.7,15.0,15.2,15.6,15.8,16.1,16.3,16.6,16.9,17.1,17.3,17.6,17.8,18.1,18.3,18.5,18.8,19.0,19.2,19.5,19.7,20.0,20.2,20.4,20.7,21.0,21.2,21.4,21.7,21.9,22.2,22.4,22.7,22.9,23.2,23.4,23.7,23.9,24.1], 
                    color: '#39b500'
                },
                {
                    seriesName: 'BB Kurang', 
                    data: [2.5,3.4,4.3,5.0,5.5,6.0,6.3,6.7,6.9,7.1,7.3,7.6,7.7,7.9,8.1,8.3,8.4,8.6,8.8,8.9,9.1,9.2,9.4,9.5,9.7,9.8,10.0,10.1,10.2,10.4,10.5,10.6,10.8,10.9,11.0,11.2,11.3,11.4,11.5,11.7,11.8,11.9,12.0,12.1,12.2,12.4,12.5,12.6,12.7,12.8,12.9,13.0,13.2,13.3,13.4,13.5,13.6,13.7,13.9,14.0,14.1],
                    color: '#39b500'
                },
                {
                    seriesName: 'BB Sangat Kurang', 
                    data: [2.1,2.9,3.8,4.4,4.9,5.3,5.7,5.9,6.2,6.4,6.6,6.8,6.9,7.1,7.3,7.4,7.6,7.7,7.8,8.0,8.1,8.2,8.4,8.5,8.6,8.8,8.9,9.0,9.1,9.2,9.4,9.5,9.6,9.7,9.8,9.9,10.0,10.1,10.2,10.3,10.4,10.5,10.6,10.7,10.8,10.9,11.0,11.1,11.2,11.3,11.4,11.5,11.6,11.7,11.8,11.9,12.0,12.1,12.2,12.3,12.4,],
                    color: '#ff0000'
                },
                {
                    seriesName: 'BB', 
                    data: [1,0,3.10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    color: '#000000'
                },
            ]
        } else {
            var src = require('../images/liz_small1.png')
            var data = [
                {
                    seriesName: 'BB Lebih', 
                    data: [4.8,6.2,7.4,8.4,9.2,9.8,10.4,10.9,11.4,11.8,12.2,12.5,12.9,13.2,13.6,13.9,14.2,14.5,14.8,15.1,15.4,15.7,16.0,16.3,16.6,17.0,17.3,17.6,17.9,18.3,18.6,18.9,19.2,19.5,19.8,20.1,20.4,20.8,21.1,21.4,21.8,22.1,22.4,22.8,23.1,23.4,23.8,24.1,24.5,24.8,25.2,25.5,25.9,26.2,26.5,26.9,27.3,27.6,27.9,28.3,28.6], 
                    color: '#f2f200'
                },
                {
                    seriesName: 'BB Normal', 
                    data: [4.2,5.5,6.6,7.5,8.2,8.8,9.3,9.8,10.2,10.5,10.9,11.2,11.5,11.8,12.1,12.4,12.6,12.9,13.2,13.5,13.7,14.0,14.3,14.6,14.9,15.1,15.4,15.7,16.0,16.2,16.5,16.8,17.0,17.3,17.6,17.9,18.1,18.4,18.7,19.0,19.2,19.5,19.8,20.1,20.4,20.7,20.9,21.2,21.5,21.8,22.1,22.4,22.7,22.9,23.2,23.5,23.8,24.1,24.4,24.6,24.9], 
                    color: '#39b500'
                },
                {
                    seriesName: 'BB Kurang', 
                    data: [2.4,3.1,3.9,4.5,5.0,5.4,5.7,6.0,6.2,6.5,6.7,6.9,7.0,7.2,7.4,7.6,7.7,7.9,8.1,8.2,8.4,8.6,8.7,8.9,9.0,9.2,9.3,9.5,9.7,9.8,10.0,10.1,10.3,10.4,10.5,10.7,10.8,10.9,11.1,11.2,11.3,11.4,11.6,11.7,11.8,12.0,12.1,12.2,12.3,12.4,12.6,12.7,12.8,12.9,13.0,13.2,13.3,13.4,13.5,13.6,13.7],
                    color: '#39b500'
                },
                {
                    seriesName: 'BB Sangat Kurang', 
                    data: [2.0,2.8,3.4,4.0,4.4,4.8,5.1,5.3,5.6,5.8,6.0,6.1,6.3,6.4,6.6,6.8,6.9,7.0,7.2,7.3,7.5,7.6,7.8,7.9,8.1,8.2,8.3,8.5,8.6,8.8,8.9,9.0,9.1,9.2,9.4,9.5,9.6,9.7,9.8,10.0,10.1,10.2,10.3,10.4,10.5,10.6,10.7,10.8,10.9,11.0,11.1,11.2,11.3,11.4,11.5,11.6,11.7,11.8,11.9,12.0,12.1],
                    color: '#ff0000'
                },
                {
                    seriesName: 'BB', 
                    data: [0,2.8,3.4,4.0,4.4,4.8,5.1,5.3,5.6,5.8,6.0,6.1,6.3,6.4,6.6,6.8,6.9,7.0,7.2,7.3,7.5,7.6,7.8,7.9,8.1,8.2,8.3,8.5,8.6,8.8,8.9,9.0,9.1,9.2,9.4,9.5,9.6,9.7,9.8,10.0,10.1,10.2,10.3,10.4,10.5,10.6,10.7,10.8,10.9,11.0,11.1,11.2,11.3,11.4,11.5,11.6,11.7,11.8,11.9,12.0,12.1],
                    color: '#000000'
                },
            ]
        }

        return (
            <Container>
                <View style={{height: StatusBar.currentHeight, backgroundColor: 'grey'}}></View>
                <Header style={{backgroundColor: '#67AFCB'}}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{color:'white'}}>Tumbuh Kembang</Text>
                    </Body>
                    <Right></Right>
                </Header>
                <Content style={{backgroundColor: '#E4F1F6'}}>
                    <ScrollView horizontal={true}>
                        <Card style={{height:500,padding:5}}>
                            <CardItem>
                                <Left>
                                    <Body>
                                        <Text note>Grafik Usia 0-24</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem cardBody>
                                <View style={{height:400,width:null,flex:1,padding:5}}>
                                    <PureChart type={'line'}
                                        data={data}
                                        width={'100%'}
                                        height={400}
                                        customValueRenderer={(index, point) => {
                                            if (index % 2 === 0) return null
                                            return (
                                                <Text style={{textAlign: 'center'}}>{point.y}</Text>
                                            )
                                        }}
                                    />
                                </View>
                            </CardItem>
                        </Card>
                    </ScrollView>
                    <View>
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

                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', height:50, borderBottomColor:'#95afc0', borderBottomWidth:1}}>
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
                                data={this.state.dataTbg} 
                                renderItem={({item}) => 
                                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', marginBottom:5, marginTop:5}}>
                                        <View style={{flex:1, alignItems: 'center', borderRightColor:'#95afc0', borderRightWidth:1}}>
                                            <Text style={styles.textHistory}>{item.tgl_timbang}</Text>
                                        </View>
                                        <View style={{flex:1, alignItems: 'center', borderRightColor:'#95afc0', borderRightWidth:1}}>
                                            <Text style={styles.textHistory}>{item.berat_badan} Kg</Text>
                                        </View>
                                        <View style={{flex:1, alignItems: 'center', borderRightColor:'#95afc0', borderRightWidth:1}}>
                                            <Text style={styles.textHistory}>{item.tinggi_badan} cm</Text>
                                        </View>
                                        <View style={{flex:1, alignItems: 'center'}}>
                                            <Text style={styles.textHistory}>{item.status_gizi}</Text>
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
    },
    nameBox:{
        flex:1, 
        paddingTop:5
    },
    textHistory:{
        fontSize:13,
        textAlign:'center'
    }
});