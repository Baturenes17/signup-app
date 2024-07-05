import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Header } from "@react-navigation/stack";
import { useCallback, useState } from "react";
import { Dimensions, StyleSheet, TextInput, View, Text, Pressable } from "react-native"
import { FIREBASE_AUTH, FIRESTORE_DB } from "./FirebaseConfig";
import { createUserWithEmailAndPassword, sendEmailVerification } from "@firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export const Signup = () => {

    const { width, height } = Dimensions.get('window');
    const Diameter = Math.min(width, height);

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [name,setName] = useState("");
    const [surname,setSurname] = useState("");
    const [age,setAge] = useState(0);
    const [city,setCity] = useState("");

    const auth = FIREBASE_AUTH;
    const db = FIRESTORE_DB;

    const handleSignUp = () => {

        if(password !== confirmPassword){
            alert("Şifreler uyuşmuyor");
            return;
        }

        createUserWithEmailAndPassword(auth,email,password)
        .then((userCredential) => {
            const user = userCredential.user;
            sendEmailVerification(user)
            .then(() => {
                alert("Mailinize Doğrulama Mesajı Gönderilmiştir")

                setDoc(doc(db,"Data",email),{
                    Ad:name,
                    Soyad:surname,
                    Yaş:age,
                    Şehir:city
                })

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

    return (
        <View style={styles.container} >
            <TextInput
                style={[styles.txtInput, { width: Diameter / 1.2, height: Diameter / 8, marginTop: Diameter / 20, paddingLeft: Diameter / 15 }]}
                placeholder="Ad"
                placeholderTextColor={"white"}
                onChangeText={(text) => setName(text)}
            />
            <TextInput style={[styles.txtInput, { width: Diameter / 1.2, height: Diameter / 8, marginTop: Diameter / 20, paddingLeft: Diameter / 15 }]}
                placeholder="Soyad"
                placeholderTextColor={"white"}
                onChangeText={(text) => setSurname(text)}
            />
            <TextInput style={[styles.txtInput, { width: Diameter / 1.2, height: Diameter / 8, marginTop: Diameter / 20, paddingLeft: Diameter / 15 }]}
                placeholder="Yaş"
                placeholderTextColor={"white"}
                keyboardType="numeric"
                onChangeText={(text) => setAge(text)}
            />
            <TextInput style={[styles.txtInput, { width: Diameter / 1.2, height: Diameter / 8, marginTop: Diameter / 20, paddingLeft: Diameter / 15 }]}
                placeholder="Şehir"
                placeholderTextColor={"white"}
                onChangeText={(text) => setCity(text)}
            />
            <TextInput style={[styles.txtInput, { width: Diameter / 1.2, height: Diameter / 8, marginTop: Diameter / 20, paddingLeft: Diameter / 15 }]}
                placeholder="Email"
                placeholderTextColor={"white"}
                keyboardType="email-address"
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput style={[styles.txtInput, { width: Diameter / 1.2, height: Diameter / 8, marginTop: Diameter / 20, paddingLeft: Diameter / 15 }]}
                placeholder="Şifre"
                placeholderTextColor={"white"}
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
/>
            <TextInput style={[styles.txtInput, { width: Diameter / 1.2, height: Diameter / 8, marginTop: Diameter / 20, paddingLeft: Diameter / 15 }]}
                placeholder="Şifre Tekrar"
                placeholderTextColor={"white"}
                secureTextEntry
                onChangeText={(text) => setConfirmPassword(text)}
            />

            <Pressable onPress={() => handleSignUp()} >
                <View style={[styles.button, { width: Diameter / 2, height: Diameter / 8, marginTop: Diameter / 10 }]} >
                    <Text style={{ fontSize: 20, fontWeight: "600" }} >Signup</Text>
                </View>
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#161715",
        justifyContent: "center",
        alignItems: "center"
    },
    txtInput: {
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 10000,
        color: "white",
        fontSize: 25
    },
    button: {
        borderWidth: 2,
        borderColor: "#F5B811",
        borderRadius: 1000,
        backgroundColor: "#F5B811",
        justifyContent: "center",
        alignItems: "center"
    }
})