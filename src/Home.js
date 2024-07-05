import { useNavigation } from "@react-navigation/native"
import { Button, Dimensions, Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";


export const Home = () => {

    const navigation = useNavigation();
    const { width, height } = Dimensions.get("window");
    const Diameter = Math.min(width, height) * 0.5;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const auth = FIREBASE_AUTH;


    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                sendEmailVerification(user)
                    .then(()=> {
                        alert("Kaydınız tamamlanmıştır lütfen e-postanızı doğrulayın");
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        alert(errorMessage);
                    })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === 'auth/email-already-in-use') {
                    alert("Zaten üyesiniz");
                } else {
                    alert(errorMessage);
                }
            })
    }

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                if(user.emailVerified){
                    navigation.navigate("login",{user});
                }else{
                    alert("Lütfen e-postanızı doğrulayın");
                    
                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(`Error [${errorCode}]: ${errorMessage}`);
                if (errorCode === 'auth/invalid-credential') {
                    alert("Bilgilerinizi yanlış girdiniz ! ");
                }
                if (errorCode === 'auth/invalid-email') {
                    alert("Yanlış Email girdiniz");
                }
                if(errorCode === 'auth/missing-password'){
                    alert("Lütfen şifrenizi giriniz");
                }
            })
    }


    return (
        <View style={styles.container} >
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", marginTop: Diameter / 3.8 }} >
                <View style={[styles.userCircle, { width: Diameter, height: Diameter }]} >
                    <FontAwesome name="user" size={Diameter / 1.5} color="white" />
                </View>
            </View>

            <View style={{ flex: 1, width: "100%", justifyContent: "flex-start", alignItems: "center" }} >
                <View style={{ flexDirection: "row", alignItems: "center" }} >
                    <Fontisto name="email" size={30} color="white" style={{ marginRight: Diameter / 18 }} />
                    <TextInput
                        placeholder="Email"
                        value={email}
                        textContentType="emailAddress"
                        keyboardType="email-address"
                        placeholderTextColor={"white"}
                        onChangeText={text => setEmail(text)}
                        style={[styles.txtInput, { width: Diameter * 1.5, height: Diameter / 4, paddingLeft: Diameter / 9, fontSize: Diameter / 11 }]} />
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", marginTop: Diameter / 10 }} >
                    <AntDesign name="lock1" size={30} color="white" style={{ marginRight: Diameter / 18 }} />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        textContentType="password"
                        secureTextEntry
                        placeholderTextColor={"white"}
                        onChangeText={text => setPassword(text)}
                        style={[styles.txtInput, { width: Diameter * 1.5, height: Diameter / 4, paddingLeft: Diameter / 9, fontSize: Diameter / 11 }]} />
                </View>

                <Pressable onPress={() => handleSignIn()} >
                    <View style={[styles.loginButton, { width: Diameter * 1.2, height: Diameter / 3.5, marginTop: Diameter / 6 }]} >
                        <Text style={[styles.btnText, { fontSize: Diameter / 12 }]} >Login</Text>
                    </View>
                </Pressable>

                <Pressable onPress={() => navigation.navigate("signup")} >
                    <View style={[styles.signupButton, { width: Diameter * 1.2, height: Diameter / 3.5, marginTop: Diameter / 9 }]} >
                        <Text style={[styles.btnText, { fontSize: Diameter / 12, color: "white" }]} >Sign up</Text>
                    </View>
                </Pressable>

                <Pressable onPress={() => navigation.navigate("reset")} >
                    <Text style={[styles.resetText, { fontSize: Diameter / 13, marginTop: Diameter / 10 }]} >Şifrenizi mi unuttunuz ?</Text>
                </Pressable>
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#161715"
    },
    text: {
        color: "#DADCD9"
    },
    body: {
        flex: 3,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    userCircle: {
        borderRadius: 1000,
        borderWidth: 3,
        borderColor: "#F5B811",
        justifyContent: "center",
        alignItems: "center"
    },
    txtInput: {
        borderWidth: 3,
        borderRadius: 1000,
        borderColor: "white",
        justifyContent: "center",
        alignItems: "center",
        color: "white"
    },
    loginButton: {
        backgroundColor: "#F5B811",
        borderRadius: 1000,
        justifyContent: "center",
        alignItems: "center"
    },
    signupButton: {
        backgroundColor: "#161715",
        borderWidth: 3,
        borderRadius: 1000,
        borderColor: "#F5B811",
        justifyContent: "center",
        alignItems: "center"
    },
    btnText: {
        color: "#161715"
    },
    resetText: {
        color: "#F5B811",
    }
})