import React from "react";
import { createRootNavigator } from "./router";
import { isSignedIn } from "./auth";

export default class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            signedIn: false,
            checkedSignIn: false
        };
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
        const { checkedSignIn, signedIn } = this.state;
        // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
        if (!checkedSignIn) {
            return null;
        }
        const Layout = createRootNavigator(signedIn);
        return <Layout />;
    }
}
