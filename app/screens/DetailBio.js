import { AppLoading, LinearGradient } from "expo";
import React from 'react';
import { StyleSheet, Image, View, StatusBar, ListView, AsyncStorage, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { Container, Content, Header, Left, Right, Body, Icon, Text, Button, List, ListItem, Thumbnail, Title, Card, CardItem, Separator } from 'native-base';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

export default class DetailBio extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id_anak          : this.props.navigation.state.params.p_id_anak,
            nama_anak        : this.props.navigation.state.params.p_nama_anak,
            tempat_lhr       : this.props.navigation.state.params.p_tempat_lhr,
            tgl_lhr          : this.props.navigation.state.params.p_tgl_lhr,
            bb_lahir         : this.props.navigation.state.params.p_bb_lahir,
            tb_lahir         : this.props.navigation.state.params.p_tb_lahir,
            jenis_kelamin    : this.props.navigation.state.params.p_jenis_kelamin,
            anak_ke          : this.props.navigation.state.params.p_anak_ke,
            jenis_persalinan : this.props.navigation.state.params.p_jenis_persalinan,
            tempat_persalinan: this.props.navigation.state.params.p_tempat_persalinan,
            dokter           : this.props.navigation.state.params.p_dokter,
            NIK_anak         : this.props.navigation.state.params.p_NIK_anak,
            isReady          : false,
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
            this.setState({ 
                isReady: true 
            });
        } catch (error) { 
            console.log(error); 
        }
    }

    render() {
        if (!this.state.isReady) {
            return (
                <ActivityIndicator size="large" />
            );
        }

        return (
            <Container>
                <View style={{height: StatusBar.currentHeight, backgroundColor: 'grey'}}></View>
                <Header style={{backgroundColor: '#67AFCB'}}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body></Body>
                    <Right></Right>
                </Header>
                <Content style={{backgroundColor: '#E4F1F6'}}>
                    <View style={styles.body}>
                        <View style={styles.bodyContent}>
                            <View style={styles.card}>
                                <View style={styles.cardIcon}>
                                    <FontAwesome name='user' size={25} color='#347B98' />
                                </View>
                                <View style={styles.viewContent}>
                                    <Text style={styles.textTitle}>Nama Anak</Text>
                                    <Text style={styles.textContent}>{this.state.nama_anak}</Text>
                                </View>
                            </View>
                            <View style={styles.card}>
                                <View style={styles.cardIcon}>
                                    <FontAwesome name='calendar' size={25} color='#347B98' />
                                </View>
                                <View style={styles.viewContent}>
                                    <Text style={styles.textTitle}>Tempat, Tgl Lahir</Text>
                                    <Text style={styles.textContent}>{this.state.tempat_lhr}, {this.state.tgl_lhr}</Text>
                                </View>
                            </View>
                            <View style={styles.card}>
                                <View style={styles.cardIcon}>
                                    <FontAwesome name='balance-scale' size={25} color='#347B98' />
                                </View>
                                <View style={styles.viewContent}>
                                    <Text style={styles.textTitle}>Berat Badan Lahir</Text>
                                    <Text style={styles.textContent}>{this.state.bb_lahir} Kg</Text>
                                </View>
                            </View>
                            <View style={styles.card}>
                                <View style={styles.cardIcon}>
                                    <FontAwesome name='long-arrow-up' size={25} color='#347B98' />
                                </View>
                                <View style={styles.viewContent}>
                                    <Text style={styles.textTitle}>Tinggi Badan Lahir</Text>
                                    <Text style={styles.textContent}>{this.state.tb_lahir} cm</Text>
                                </View>
                            </View>
                            <View style={styles.card}>
                                <View style={styles.cardIcon}>
                                    {this.state.jenis_kelamin == 0? <FontAwesome name="male" size={25} color='#347B98' /> : <FontAwesome name="female" size={25} color='#347B98' />}
                                </View>
                                <View style={styles.viewContent}>
                                    <Text style={styles.textTitle}>Jenis Kelamin</Text>
                                    {this.state.jenis_kelamin == 0? <Text>Laki-Laki</Text> : <Text>Perempuan</Text>}
                                </View>
                            </View>
                            <View style={styles.card}>
                                <View style={styles.cardIcon}>
                                    <MaterialCommunityIcons name="format-list-numbers" size={25} color='#347B98' />
                                </View>
                                <View style={styles.viewContent}>
                                    <Text style={styles.textTitle}>Anak Ke-</Text>
                                    <Text style={styles.textContent}>{this.state.anak_ke}</Text>
                                </View>
                            </View>
                            <View style={styles.card}>
                                <View style={styles.cardIcon}>
                                    <FontAwesome name="bed" size={25} color='#347B98' />
                                </View>
                                <View style={styles.viewContent}>
                                    <Text style={styles.textTitle}>Jenis Persalinan</Text>
                                    <Text style={styles.textContent}>{this.state.jenis_persalinan}</Text>
                                </View>
                            </View>
                            <View style={styles.card}>
                                <View style={styles.cardIcon}>
                                    <FontAwesome name="hospital-o" size={25} color='#347B98' />
                                </View>
                                <View style={styles.viewContent}>
                                    <Text style={styles.textTitle}>Tempat Bersalin</Text>
                                    <Text style={styles.textContent}>{this.state.tempat_persalinan}</Text>
                                </View>
                            </View>
                            <View style={styles.card}>
                                <View style={styles.cardIcon}>
                                    <FontAwesome name="user-md" size={25} color='#347B98' />
                                </View>
                                <View style={styles.viewContent}>
                                    <Text style={styles.textTitle}>Pembantu Persalinan</Text>
                                    <Text style={styles.textContent}>{this.state.dokter}</Text>
                                </View>
                            </View>
                            <View style={styles.card}>
                                <View style={styles.cardIcon}>
                                    <FontAwesome name="id-card" size={25} color='#347B98' />
                                </View>
                                <View style={styles.viewContent}>
                                    <Text style={styles.textTitle}>NIK Anak</Text>
                                    {this.state.NIK_anak == null? <Text style={styles.textContent}>Tidak Ada</Text> : <Text style={styles.textContent}>{this.state.NIK_anak}</Text> }
                                </View>
                            </View>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    note:{
        color: '#1A3E4C',
        fontSize: 12
    },
    body:{
        marginTop:0
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