import { HeaderStyleInterpolators, createStackNavigator } from "@react-navigation/stack"
import { View } from "react-native"
import { Home } from "./Home";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { ResetPassword } from "./ResetPassword";


const Stack = createStackNavigator();

export const Navigator = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="home" component={Home} 
            options={{
                headerShown:false
            }}
            />
            <Stack.Screen name="login" component={Login} 
            options={{
                headerShown:false
            }}/>
            <Stack.Screen name="signup" component={Signup} 
            options={{
                headerTitle:"Signup",
                headerTitleStyle:{color:"white"},
                headerTintColor:"white",
                headerTransparent:true,
            }}/>
            <Stack.Screen name="reset" component={ResetPassword} 
            options={{
                headerTitle:"Reset",
                headerShown:true,
                headerTitleStyle:{color:"white"},
                headerTintColor:"white",
                headerTransparent:true,
            }}/>
        </Stack.Navigator>
    )
}