import React from "react";
import { Platform, StatusBar, TouchableOpacity, View, SafeAreaView, ScrollView, Image, Text } from "react-native";
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator, createDrawerNavigator, DrawerItems } from "react-navigation";
import { FontAwesome } from '@expo/vector-icons';

// import Try from "./screens/Try";
import SignIn from "./screens/SignIn";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Biodata from "./screens/Biodata";
import DetailBio from "./screens/DetailBio";
import Timbang from "./screens/Timbang";
import Imunisasi from "./screens/Imunisasi";
import VitaminA from "./screens/VitaminA";
import Kegiatan from "./screens/Kegiatan";
import CustomDrawer from "./screens/CustomDrawer";

const headerStyle = {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};
const tabBarOptions = Platform.OS === 'ios' ? 
{
    // iOS tabBarOptions
    showLabel: true
} : {
    // Android tabBarOptions
    showIcon: true,
    showLabel: true
}

export const SignedOut = createStackNavigator({
    SignIn: {
        screen: SignIn,
        navigationOptions: {
            title: "Sign In",
            header: null,
            headerMode: 'none'
        }
    }
});

export const StackBio = createStackNavigator({
    BiodataScreen: {screen: Biodata},
    DetailBio: {screen: DetailBio}
}, {
    initialRouteName : 'BiodataScreen',
    headerMode: 'none'
});

export const StackTimbang1 = createStackNavigator({
    Timbang: {screen: Timbang}
}, {
    initialRouteName : 'Timbang',
    headerMode: 'none'
});

export const StackImun1 = createStackNavigator({
    Imunisasi: {screen: Imunisasi},
}, {
    initialRouteName : 'Imunisasi',
    headerMode: 'none'
});

export const StackVitA1 = createStackNavigator({
    VitaminA: {screen: VitaminA}
}, {
    initialRouteName : 'VitaminA',
    headerMode: 'none'
});

export const Drawer = createDrawerNavigator({
    StackTimbang: {screen: (props) => <Timbang {...props} />},
    StackImun: {screen: (props) => <Imunisasi {...props} />},
    StackVitA: {screen: (props) => <VitaminA {...props} />}
}, {
    initialRouteName: 'StackTimbang',
    contentComponent: (props) => <CustomDrawer {...props} />
});

export const StackHome = createStackNavigator({
    HomeScreen: {screen: Home},
    Drawer: {screen: Drawer},
}, {
    initialRouteName : 'HomeScreen',
    headerMode: 'none'
});

export const SignedIn = createBottomTabNavigator({
    // Try: {screen: Try},
    Home: {
        screen: StackHome,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) => (
                <FontAwesome name="home" color={tintColor} size={24} />
            )
        } 
    },
    Biodata: {
        screen: StackBio,
        navigationOptions: {
            tabBarLabel: 'Biodata',
            tabBarIcon: ({ tintColor }) => (
                <FontAwesome name="list" color={tintColor} size={24} />
            )
        } 
    },
    Kegiatan: {
        screen: Kegiatan,
        navigationOptions: {
            tabBarLabel: 'Agenda',
            tabBarIcon: ({ tintColor }) => (
                <FontAwesome name="calendar" color={tintColor} size={24} />
            )
        } 
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({ tintColor }) => (
                <FontAwesome name="gear" size={24} color={tintColor} />
            )
        } 
    }
}, { 
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    tabBarOptions: {
        activeTintColor: '#347B98',
        inactiveTintColor: '#E4F1F6',
        style: {
            backgroundColor: '#67AFCB',
            borderTopWidth: 0,
            shadowOffset: { width: 5, height: 3 },
            shadowColor: 'black',
            shadowOpacity: 0.5,
            elevation: 5
        }
    }
});

export const createRootNavigator = (signedIn = false) => {
    // console.log(signedIn)
    return createSwitchNavigator(
    {
        SignedIn: {
            screen: SignedIn
        },
        SignedOut: {
            screen: SignedOut
        }
    },
    {
        initialRouteName: (signedIn ? "SignedIn" : "SignedOut")
    });
};
