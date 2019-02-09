import { AsyncStorage } from "react-native";
import { SignedIn } from "./router";

export const onSignIn = (email, password, navigate) => {
    fetch('https://posyandumandiri.000webhostapp.com/api/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    })
    .then((response) => response.json())
    .then((res) => {
        console.log(res);
        if (res.success === true) {
            AsyncStorage.setItem('auth', JSON.stringify(res));
            navigate("SignedIn");
        } else {
            alert(res.message);
        }
    })
    .catch((error) => {
        console.error(error);
    });
}

export const onSignOut = (navigate) => {
    AsyncStorage.removeItem('auth');
    navigate("SignedOut");
}

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("auth")
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};