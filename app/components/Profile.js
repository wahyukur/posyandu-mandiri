import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Profile extends React.Component {

    // constructor(){
    //     this._loadInitialState().done();
    // }

    // _loadInitialState = async () => {
    //     const retrievedItem =  await AsyncStorage.getItem(auth);
    //     const item = JSON.parse(retrievedItem);
    //     return item;
    // }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Welcome to member area</Text>
                <Text></Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
    },
    text: {
        color: '#fff',
    }
});