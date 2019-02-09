import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export const DrawerItem = ({ navigation, icon, name, screenName }) =>
    <TouchableOpacity 
        style={styles.menuItem} 
        onPress={() => navigation.navigate(`${screenName}`, { isStatusBarHidden: false })}
    >
        <FontAwesome name ={icon} size={25} color="#333" style={{margin:15}} />
        <Text style={styles.menuItemText}>{name}</Text>
    </TouchableOpacity>


const styles = StyleSheet.create({
    menuItem: {
        flexDirection:'row'
    },
    menuItemText: {
        fontSize:15,
        fontWeight:'300',
        margin:15,
    }
});
