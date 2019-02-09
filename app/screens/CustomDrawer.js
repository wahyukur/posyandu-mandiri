import { AppLoading } from "expo";
import React from 'react';
import { StyleSheet, Image, View, StatusBar, ListView, AsyncStorage, ScrollView, FlatList, Dimensions, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { Container, Content, Header, Left, Right, Body, Icon, Text, Button, List, ListItem, Thumbnail, Title, Card, CardItem, Separator } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

export default class CustomDrawer extends React.Component {

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
        try { 
            await Expo.Font.loadAsync({
                Arial: require("native-base/Fonts/arial.ttf"),
                Roboto: require("native-base/Fonts/Roboto.ttf"),
                Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
                Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
            });
            this.setState({ isReady: true });
            // console.log(this.state.nama_anak);
        } catch (error) { 
            console.log(error);
        }
    }

    // DetailTbg=(id_anak)=>{
    //     this.props.navigation.navigate('DetailTimbang', { 
    //         p_id_anak : id_anak
    //     });
    // }

    render() {
        if (!this.state.isReady) {
            return (
                <View style={styles.activity}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        }

        const { navigate } = this.props.navigation;
        if (this.state.jenis_kel === '0') {
            var src = require('../images/russell-small.png')
        } else {
            var src = require('../images/liz_small1.png')
        }

        return (
            <SafeAreaView style={{flex:1, backgroundColor:'#E4F1F6'}}>
                <View style={{backgroundColor: "#DCDCDC"}}>
                    <View style={{padding:30, alignItems: 'center'}}>
                        <Image style={{width: 130,height: 130,borderRadius: 63,borderWidth: 4,borderColor: "white",marginBottom:10}} source={src}/>

                        <Text style={{fontSize:22,color:"#000000",fontWeight:'600'}}>{this.state.nama_anak} </Text>
                        <Text style={{fontSize:16,color:"#778899",fontWeight:'600'}}>Usia {this.state.umur} Bulan</Text>
                        <Text style={{fontSize:16,color:"#778899",fontWeight:'600'}}>Kelahiran: {this.state.tgl_lhr} </Text>
                    </View>
                </View>

                <ListItem icon onPress={() => navigate('StackTimbang')}>
                    <Left>
                        <Button style={{ backgroundColor: "#3498db" }}>
                            <FontAwesome name="line-chart" size={20} color="white" />
                        </Button>
                    </Left>
                    <Body>
                        <Text>Tumbuh Kembang</Text>
                    </Body>
                    <Right/>
                </ListItem>
                <ListItem icon onPress={() => navigate('StackImun')}>
                    <Left>
                        <Button style={{ backgroundColor: "#1abc9c" }}>
                            <FontAwesome name="eyedropper" size={20} color="white" />
                        </Button>
                    </Left>
                    <Body>
                        <Text>Imunisasi</Text>
                    </Body>
                    <Right/>
                </ListItem>
                <ListItem icon onPress={() => navigate('StackVitA')}>
                    <Left>
                        <Button style={{ backgroundColor: "#f1c40f" }}>
                            <FontAwesome name="medkit" size={20} color="white" />
                        </Button>
                    </Left>
                    <Body>
                        <Text>Vitamin A</Text>
                    </Body>
                    <Right/>
                </ListItem>
            </SafeAreaView>
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
    }
});   