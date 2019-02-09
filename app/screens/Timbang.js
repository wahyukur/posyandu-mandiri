import { Font } from "expo";
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
            dataTbg: {}
        };
    }

    async componentWillMount () { 
        try { 
            await fetch('https://posyandumandiri.000webhostapp.com/api/getTimbang/'+this.state.id_anak, {
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
                        dataAnak: res.dataAnak,
                        dataTbg: res.dataTbg
                    });
                    // console.log(this.state.dataAnak.nama_anak);
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

    DetailTbg=(id_anak)=>{
        this.props.navigation.navigate('DetailTimbang', { 
            p_id_anak : id_anak
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
        } else {
            var src = require('../images/liz_small1.png')
        }

        let data = [
            [
                {"x": -10,"y": -1000}, 
                {"x": -9,"y": -729}, 
                {"x": -8,"y": -512}, 
                {"x": -7,"y": -343}, 
                {"x": -6,"y": -216}, 
                {"x": -5,"y": -125}, 
                {"x": -4,"y": -64}, 
                {"x": -3,"y": -27}, 
                {"x": -2,"y": -8}, 
                {"x": -1,"y": -1}, 
                {"x": 0,"y": 0}, 
                {"x": 1,"y": 1}, 
                {"x": 2,"y": 8}, 
                {"x": 3,"y": 27}, 
                {"x": 4,"y": 64}, 
                {"x": 5,"y": 125}, 
                {"x": 6,"y": 216}, 
                {"x": 7,"y": 343}, 
                {"x": 8,"y": 512}, 
                {"x": 9,"y": 729}, 
                {"x": 10,"y": 1000}
            ],[
                {"x": -10,"y": 100}, 
                {"x": -9,"y": 81}, 
                {"x": -8,"y": 64}, 
                {"x": -7,"y": 49}, 
                {"x": -6,"y": 36}, 
                {"x": -5,"y": 25}, 
                {"x": -4,"y": 16}, 
                {"x": -3,"y": 9}, 
                {"x": -2,"y": 4}, 
                {"x": -1,"y": 1}, 
                {"x": 0,"y": 0}, 
                {"x": 1,"y": 1}, 
                {"x": 2,"y": 4}, 
                {"x": 3,"y": 9}, 
                {"x": 4,"y": 16}, 
                {"x": 5,"y": 25}, 
                {"x": 6,"y": 36}, 
                {"x": 7,"y": 49}, 
                {"x": 8,"y": 64}, 
                {"x": 9,"y": 81}, 
                {"x": 10,"y": 100}
            ],
        ];

        let options = {
            width: 280,
            height: 280,
            color: '#2980B9',
            margin: {
                top: 20,
                left: 45,
                bottom: 25,
                right: 20
            },
            animate: {
                type: 'delayed',
                duration: 200
            },
            axisX: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'bottom',
                label: {
                    fontFamily: 'Arial',
                    fontSize: 14,
                    fontWeight: true,
                    fill: '#34495E'
                }
            },
            axisY: {
                showAxis: true,
                showLines: true,
                showLabels: true,
                showTicks: true,
                zeroAxis: false,
                orient: 'left',
                label: {
                    fontFamily: 'Arial',
                    fontSize: 14,
                    fontWeight: true,
                    fill: '#34495E'
                }
            }
        }

        var dataMale_0_24 = [
            {
                seriesName: 'BB Lebih', 
                data: [
                    5.0,6.5,7.9,8.9,9.6,10.3,
                    10.9,11.3,11.8,12.2,12.5,
                    12.9,13.2,13.5,13.8,14.2,
                    14.5,14.8,15.1,15.4,15.7,
                    16.0,16.3,16.6,16.9,
                ], 
                color: '#f2f200'
            },
            {
                seriesName: 'BB Normal', 
                data: [
                    4.4,5.8,7.1,8.0,8.7,9.3,
                    9.8,10.3,10.7,11.0,11.4,
                    11.7,12.0,12.3,12.6,12.8,
                    13.1,13.4,13.6,13.9,14.2,
                    14.4,14.7,15.0,15.2,
                ], 
                color: '#39b500'
            },
            {
                seriesName: 'BB Kurang', 
                data: [
                    2.5,3.4,4.3,5.0,5.5,6.0,
                    6.3,6.7,6.9,7.1,7.3,
                    7.6,7.7,7.9,8.1,8.3,
                    8.4,8.6,8.8,8.9,9.1,
                    9.2,9.4,9.5,9.7,
                ],
                color: '#39b500'
            },
            {
                seriesName: 'BB Sangat Kurang', 
                data: [
                    2.1,2.9,3.8,4.4,4.9,5.3,
                    5.7,5.9,6.2,6.4,6.6,
                    6.8,6.9,7.1,7.3,7.4,
                    7.6,7.7,7.8,8.0,8.1,
                    8.2,8.4,8.5,8.6,
                ],
                color: '#ff0000'
            },
        ]

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
                        <Card style={{width:330,height:300,padding:5}}>
                            <CardItem>
                                <Left>
                                    <Body>
                                        <Text note>Grafik Usia 0-24</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem cardBody>
                                <View style={{height:200,width:null,flex:1,padding:5}}>
                                    <PureChart type={'line'}
                                        data={dataMale_0_24}
                                        width={'100%'}
                                        height={200}
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
                        <Card style={{width:330,height:300,padding:5}}>
                            <CardItem>
                                <Left>
                                    <Body>
                                        <Text note>Grafik Usia 25-60</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem cardBody>
                                <View style={{height:200,width:null,flex:1,padding:5}}>
                                    <PureChart type={'line'}
                                        data={dataMale_0_24}
                                        width={'100%'}
                                        height={200}
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