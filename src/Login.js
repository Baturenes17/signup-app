import { useRoute } from "@react-navigation/native"
import { StyleSheet, View,Text } from "react-native"
import { FIREBASE_AUTH, FIRESTORE_DB } from "./FirebaseConfig";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";

const db = FIRESTORE_DB;

export const Login = () => {

    const [income,setIncome] = useState("");

    const route = useRoute();
    const {user} = route.params;

    const DataPipeLine = doc(db,"Data",user.email);


    useEffect(() => {
        onSnapshot(DataPipeLine,(doc) => {
            setIncome(doc.data());
        })
    })

    return(
        <View style={styles.container} >
            <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginVertical:10}} >
            <Text style={styles.label} >Ad : </Text>
            <Text style={styles.info} >{income["Ad"]}</Text>
            </View>

            <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginVertical:10}} >
            <Text style={styles.label} >Soyad : </Text>
            <Text style={styles.info} >{income["Soyad"]}</Text>
            </View>

            <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginVertical:10}} >
            <Text style={styles.label} >Yaş : </Text>
            <Text style={styles.info} >{income["Yaş"]}</Text>
            </View>

            <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginVertical:10}} >
            <Text style={styles.label} >Şehir : </Text>
            <Text style={styles.info} >{income["Şehir"]}</Text>
            </View>
            
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
    label:{
        fontSize:20,
        color:"white"
    },
    info:{
        fontSize:20,
        color:"#F5B811"
    }
})