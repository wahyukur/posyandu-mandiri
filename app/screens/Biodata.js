import { AppLoading } from "expo";
import React from 'react';
import { StyleSheet, Image, View, StatusBar, ListView, AsyncStorage, ScrollView, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Container, Content, Header, Left, Right, Body, Icon, Text, Button, List, ListItem, Thumbnail, Title, Card, CardItem, Separator } from 'native-base';
import { Ionicons, FontAwesome, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

export default class Biodata extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            auth: {},
            bioIbu: {},
            bioAnak: {},
            isReady: false,
            isLoading: false,
            isError: false
        };
    }

    async componentWillMount () { 
        try {
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

    async componentDidMount(){
        try {
            var data = await AsyncStorage.getItem('auth');
            data = JSON.parse(data);
            this.setState({
                auth: data
            });

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
        fetch('https://posyandumandiri.000webhostapp.com/api/getBio/'+this.state.auth.id, {
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
                bioIbu: res.dataIbu,
                bioAnak: res.dataAnak,
                isLoading:false,
                isError: false
            });
            // console.log(this.state.bioIbu);
        })
        .catch((error) => {
            this.setState({
                isLoading:false,
                isError: true
            });
            alert("Error Load Data");
            // console.error(error);
        });
    }

    DetailAnak=(id_anak,nama_anak, tempat_lhr, tgl_lhr, bb_lahir, tb_lahir, jenis_kelamin, anak_ke, jenis_persalinan, tempat_persalinan, dokter, NIK_anak)=>{
        this.props.navigation.navigate('DetailBio', { 
            p_id_anak : id_anak,
            p_nama_anak : nama_anak,
            p_tempat_lhr : tempat_lhr,
            p_tgl_lhr : tgl_lhr,
            p_bb_lahir : bb_lahir,
            p_tb_lahir : tb_lahir,
            p_jenis_kelamin : jenis_kelamin,
            p_anak_ke : anak_ke,
            p_jenis_persalinan : jenis_persalinan,
            p_tempat_persalinan : tempat_persalinan,
            p_dokter : dokter,
            p_NIK_anak : NIK_anak
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

        if (this.state.isLoading) {
            return (
                <View style={styles.activity}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        }

        if (this.state.isError) {
            return (
                <Container>
                    <View style={{height: StatusBar.currentHeight, backgroundColor: 'grey'}}></View>
                    <Content style={{backgroundColor: '#E4F1F6'}}>
                        <View style={styles.container}>
                            <View style={styles.header}></View>
                            <Image style={styles.avatar} source={{uri: "https://bootdey.com/img/Content/avatar/avatar5.png"}}/>
                            <View style={styles.body}>
                                <View style={styles.bodyContent}>
                                    <View style={{flex:1,paddingVertical: 5,alignItems:'center',height:100}}>
                                        <TouchableOpacity onPress={this.makeRemoteRequest.bind(this)}
                                            style={{
                                                borderWidth:1,
                                                borderColor:'rgba(0,0,0,0.2)',
                                                alignItems:'center',
                                                justifyContent:'center',
                                                width:50,
                                                height:50,
                                                backgroundColor:'#fff',
                                                borderRadius:100,
                                            }}
                                        >
                                            <MaterialCommunityIcons name="reload" size={30} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Content>
                </Container>
            );
        }

        if (this.state.bioIbu.agama == 0) {
            var agama = 'Islam';
        } else if (this.state.bioIbu.agama == 1){
            var agama = 'Kristen';
        } else if (this.state.bioIbu.agama == 2){
            var agama = 'Katolik';
        } else if (this.state.bioIbu.agama == 3){
            var agama = 'Hindu';
        } else if (this.state.bioIbu.agama == 4){
            var agama = 'Buddha';
        } else if (this.state.bioIbu.agama == 5){
            var agama = 'Kong Hu Cu';
        } else {
            var agama = '-';
        } 

        return (
            <Container>
                <View style={{height: StatusBar.currentHeight, backgroundColor: 'grey'}}></View>
                <Content style={{backgroundColor: '#E4F1F6'}}>
                    <View style={styles.container}>
                        <View style={styles.header}></View>
                        <Image style={styles.avatar} source={{uri: "https://bootdey.com/img/Content/avatar/avatar5.png"}}/>
                        <View style={styles.body}>
                            <View style={styles.bodyContent}>
                                <View style={styles.card}>
                                    <View style={styles.cardIcon}>
                                        <FontAwesome name='user' size={25} color='#347B98' />
                                    </View>
                                    <View style={styles.viewContent}>
                                        <Text style={styles.textTitle}>Nama</Text>
                                        <Text style={styles.textContent}>{this.state.bioIbu.nama_ibu}</Text>
                                    </View>
                                </View>
                                <View style={styles.card}>
                                    <View style={styles.cardIcon}>
                                        <Entypo name='user' size={25} color='#347B98' />
                                    </View>
                                    <View style={styles.viewContent}>
                                        <Text style={styles.textTitle}>Nama Suami</Text>
                                        <Text style={styles.textContent}>{this.state.bioIbu.nama_suami}</Text>
                                    </View>
                                </View>
                                <View style={styles.card}>
                                    <View style={styles.cardIcon}>
                                        <FontAwesome name='calendar' size={25} color='#347B98' />
                                    </View>
                                    <View style={styles.viewContent}>
                                        <Text style={styles.textTitle}>Tempat, Tgl Lahir</Text>
                                        <Text style={styles.textContent}>{this.state.bioIbu.tempat_lahir}, {this.state.bioIbu.tgl_lahir}</Text>
                                    </View>
                                </View>
                                <View style={styles.card}>
                                    <View style={styles.cardIcon}>
                                        <FontAwesome name='home' size={25} color='#347B98' />
                                    </View>
                                    <View style={styles.viewContent}>
                                        <Text style={styles.textTitle}>Alamat</Text>
                                        <Text style={styles.textContent}>{this.state.bioIbu.alamat} rt/rw 0{this.state.bioIbu.rt}/0{this.state.bioIbu.rw} {this.state.bioIbu.kelurahan} {this.state.bioIbu.kecamatan}</Text>
                                    </View>
                                </View>
                                <View style={styles.card}>
                                    <View style={styles.cardIcon}>
                                        <FontAwesome name='phone' size={25} color='#347B98' />
                                    </View>
                                    <View style={styles.viewContent}>
                                        <Text style={styles.textTitle}>Nomor Telepon</Text>
                                        {this.state.bioIbu.No_tlp == null? <Text style={styles.textContent}>Tidak Ada</Text>: <Text style={styles.textContent}>{this.state.bioIbu.No_tlp}</Text> }
                                    </View>
                                </View>
                                <View style={styles.card}>
                                    <View style={styles.cardIcon}>
                                        <FontAwesome name='user-secret' size={25} color='#347B98' />
                                    </View>
                                    <View style={styles.viewContent}>
                                        <Text style={styles.textTitle}>Agama</Text>
                                        <Text style={styles.textContent}>{agama}</Text>
                                    </View>
                                </View>
                                <View style={styles.card}>
                                    <View style={styles.cardIcon}>
                                        <FontAwesome name='list-alt' size={25} color='#347B98' />
                                    </View>
                                    <View style={styles.viewContent}>
                                        <Text style={styles.textTitle}>NIK</Text>
                                        {this.state.bioIbu.NIK == null? <Text style={styles.textContent}>Tidak Ada</Text> : <Text style={styles.textContent}>{this.state.bioIbu.NIK}</Text> }
                                    </View>
                                </View>
                                <View style={styles.card}>
                                    <View style={styles.cardIcon}>
                                        <FontAwesome name='list-alt' size={25} color='#347B98' />
                                    </View>
                                    <View style={styles.viewContent}>
                                        <Text style={styles.textTitle}>Nomor KK</Text>
                                        {this.state.bioIbu.No_KK == null? <Text style={styles.textContent}>Tidak Ada</Text> : <Text style={styles.textContent}>{this.state.bioIbu.No_KK}</Text> }
                                    </View>
                                </View>
                                <View style={styles.card}>
                                    <View style={styles.cardIcon}>
                                        <FontAwesome name='list-alt' size={25} color='#347B98' />
                                    </View>
                                    <View style={styles.viewContent}>
                                        <Text style={styles.textTitle}>Nomor BPJS</Text>
                                        {this.state.bioIbu.No_BPJS == null? <Text style={styles.textContent}>Tidak Ada</Text> : <Text style={styles.textContent}>{this.state.bioIbu.No_BPJS}</Text> }
                                    </View>
                                </View>
                                <View style={styles.card}>
                                    <View style={styles.cardIcon}>
                                        <FontAwesome name='info-circle' size={25} color='#347B98' />
                                    </View>
                                    <View style={styles.viewContent}>
                                        <Text style={styles.textTitle}>Status Gakin</Text>
                                        {this.state.bioIbu.gakin == 1? <Text style={styles.textContent}>Gakin</Text> : <Text style={styles.textContent}>Non Gakin</Text> }
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    <Separator bordered style={{backgroundColor:'#67AFCB'}}>
                        <Text style={{color:'#1A3E4C', fontSize:10, padding:0}}>Biodata Anak</Text>
                    </Separator>
                    <List>
                        <FlatList 
                            data={this.state.bioAnak} 
                            renderItem={({item}) => (
                                <ListItem onPress={this.DetailAnak.bind(
                                    this, 
                                    item.id_anak,
                                    item.nama_anak, 
                                    item.tempat_lhr, 
                                    item.tgl_lhr, 
                                    item.bb_lahir,
                                    item.tb_lahir,
                                    item.jenis_kelamin,
                                    item.anak_ke,
                                    item.jenis_persalinan,
                                    item.tempat_persalinan,
                                    item.dokter,
                                    item.NIK_anak
                                )}>
                                    <Left>
                                        <Text>{item.nama_anak}</Text>
                                    </Left>
                                    <Right>
                                        <Ionicons name="md-arrow-round-forward" size={20} color="gray" />
                                    </Right>
                                </ListItem>
                            )} 
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </List>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    activity: {
        flex: 1,
        justifyContent: 'center'
    },
    note:{
        color: '#1A3E4C',
        fontSize: 12
    },
    icon: {
        fontSize: 40,
        color: 'black'
    },
    label:{
        fontSize: 10,
    },
    data: {
        fontSize: 20,
    },
    header:{
        backgroundColor: "#67AFCB",
        height:110,
    },
    avatar: {
        width: 120,
        height: 120,
        borderWidth: 4,
        borderColor: "white",
        alignSelf:'center',
        position: 'absolute',
        marginTop:50
    },
    body:{
        marginTop:60
    },
    bodyContent: {
        flex: 1,
        padding:10,
    },
    cardIcon:{
        justifyContent:'center', 
        padding:5,
        width:40,
        alignItems:'center'
    },
    card:{
        backgroundColor: "#FFFFFF",
        padding:10,
        marginTop:10,
        flexDirection:'row',
        flex:1
    },
    viewContent:{
        marginLeft:10, 
        borderBottomColor:'black', 
        flex:1
    },
    textTitle:{
        fontSize:12, 
        color:'#67AFCB'
    },
    textContent:{
        color:'#636e72',
        flexWrap: "wrap"
    }
});