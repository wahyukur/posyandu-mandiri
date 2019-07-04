import { AppLoading, Font } from "expo";
import React from 'react';
import { StyleSheet, Image, View, StatusBar, ListView, AsyncStorage, ActivityIndicator } from 'react-native';
import { Container, Content, Header, Left, Right, Body, Icon, Text, Button, List, ListItem, Thumbnail, Title } from 'native-base';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default class Kegiatan extends React.PureComponent {

    constructor() {
        super();
        this.state = {
            isReady: false,
            items: {}
        };
    }

    componentDidMount(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth();
        var yyyy = today.getFullYear();
        if (dd<10) {
            dd = '0'+dd;
        }
        if (mm<10) {
            mm = '0'+mm;
        }
        today = yyyy+'-'+mm+'-'+dd;
        return fetch('https://posyandumandiri.000webhostapp.com/api/getAgenda', {
            method: 'get',
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
                    isReady: true,
                    items: res,
                    today: today
                });
                // console.log(this.state.items);
            } else {
                alert("Error Load Data");
            }
        })
        .catch((error) => {
            console.error(error);
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
        
        return (
            <Container>
                <View style={{height: StatusBar.currentHeight, backgroundColor: 'grey'}}></View>
                <Header style={{ backgroundColor:'#67AFCB' }}>
                    <Left></Left>
                    <Body></Body>
                    <Right></Right>
                </Header>
                <Agenda
                    items={this.state.items}
                    loadItemsForMonth={this.loadItems.bind(this)}
                    selected={this.state.today}
                    renderItem={this.renderItem.bind(this)}
                    renderEmptyDate={this.renderEmptyDate.bind(this)}
                    rowHasChanged={this.rowHasChanged.bind(this)}
                />
            </Container>
        );
    }

    loadItems(day) {
        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 *1000;
                const strTime = this.timeToString(time);
                if (!this.state.items[strTime]) {
                    this.state.items[strTime] = [];
                }
            }
            const newItems = {};
            Object.keys(this.state.items).forEach(key => {
                newItems[key] = this.state.items[key];
            });
            this.setState({
                items: newItems,
            });
            // console.log(this.state.items);
        }, 1000);
    }

    renderItem(item) {
        return (
            <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
        );
    }

    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}><Text>Tidak ada agenda!</Text></View>
        );
    }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    activity: {
        flex: 1,
        justifyContent: 'center'
    }
});