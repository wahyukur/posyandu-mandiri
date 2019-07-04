import React from "react";
import { Font } from "expo";
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { createRootNavigator } from "./router";
import { isSignedIn } from "./auth";

export default class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signedIn: false,
            checkedSignIn: false,
            isReady: true
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

    componentDidMount() {
        isSignedIn()
            .then(res => {
                // console.log(res);
                this.setState({ signedIn: res, checkedSignIn: true })
            })
            .catch(err => console.log(err));
    }

    render() {
        if (!this.state.isReady) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        }

        const { checkedSignIn, signedIn } = this.state;
        // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
        if (!checkedSignIn) {
            return null;
        }
        const Layout = createRootNavigator(signedIn);
        return <Layout />;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});
