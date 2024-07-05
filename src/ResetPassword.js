import { Button, Dimensions, StyleSheet, TextInput, View, Text, Pressable } from "react-native"
import { FIREBASE_AUTH } from "./FirebaseConfig";
import { sendPasswordResetEmail } from "@firebase/auth";
import { useState } from "react";

export const ResetPassword = () => {

    const {width,height} = Dimensions.get('window');
    const Diameter = Math.min(width,height);

    const [email,setEmail] = useState("");

    const auth = FIREBASE_AUTH;

    const handleResetPassword = () => {
        sendPasswordResetEmail(auth,email)
        .then(() => {
            alert("Şifre sıfırlama e-postası gönderilmiştir");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if(errorCode === 'auth/invalid-email'){
                alert("Geçersiz e-posta adresi");
            }else if(errorCode === 'auth/user-not-found'){
                alert("Böyle bir kullanıcı bulunamadı");
            }else{
                alert(errorMessage);
            }
        })
    }

    return(
        <View style={styles.container} >
            <TextInput 
            style={[styles.txtInput,{width:Diameter/1.3,height:Diameter/8,paddingLeft:Diameter/25}]}
            placeholder="Email"
            placeholderTextColor={"white"}
            textContentType="emailAddress"
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
            />

        <Pressable onPress={() => handleResetPassword()}>
        <View style={[styles.resetButton,{marginTop:Diameter/10,width:Diameter/2,height:Diameter/9}]} >
                <Text>Send Reset Link</Text>
            </View>
        </Pressable>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#161715",
        justifyContent:"center",
        alignItems:"center"
    },
    txtInput:{
        borderWidth:3,
        borderColor:"white",
        borderRadius:10,
        fontSize:20,
        color:"white"
    },
    resetButton:{
        backgroundColor:"#F5B811",
        borderRadius:1000,
        justifyContent:"center",
        alignItems:"center"
    }
})