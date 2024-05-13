import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { StyleSheet } from "react-native";
import ForgetPassword from "../screens/AuthScreen/ForgetPassword";
import LoginScreen from "../screens/AuthScreen/Login";
import ResetPassword from "../screens/AuthScreen/ResetPassword";
import SignupScreen from "../screens/AuthScreen/Signup";
import VerifyScreen from "../screens/AuthScreen/Verify";
import WelcomeScreen from "../screens/AuthScreen/Welcome";
import { RootStackParamList } from "./TStack";

interface AuthNavigatorProps {}

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthNavigator = (props: AuthNavigatorProps) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={"Welcome"} component={WelcomeScreen} />
      <Stack.Screen name={"Login"} component={LoginScreen} />
      <Stack.Screen name={"Signup"} component={SignupScreen} />
      <Stack.Screen name={"Verify"} component={VerifyScreen} />
      <Stack.Screen name={"ForgetPassword"} component={ForgetPassword} />
      <Stack.Screen name={"ResetPassword"} component={ResetPassword} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;

const styles = StyleSheet.create({
  container: {},
});
