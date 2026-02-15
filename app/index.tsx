import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";


export default function Index() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const staticUsername = "Admin";
  const staticPassword = "Password123!";

  function verifyUser() {
    if (username !== staticUsername || password !== staticPassword) {
      // setErrorMessage("Wrong Credentials");
      Toast.show({
        type: "error",
        text1: "Invalid Credentials",
      });
      return;
    }
    Toast.show({
      type: "success",
      text1: "Login Successful",
    });
    // setErrorMessage("Login Successful");
    router.replace("/dashboard");

  }

  return (
    <SafeAreaProvider>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#2A7B9B",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: "LOGIN",
          headerTitleAlign: "center",
          headerLargeTitle: true,
        }}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.mainContainer}>
          <Text style={styles.text}>Login System</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
          />
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            secureTextEntry
          />
          <View style={styles.buttonFit}>
            <Button title="Login" onPress={verifyUser} />
          </View>
          {/* {errorMessage ? (
            <Text style={{ color: "red", fontSize: 14 }}>
              {errorMessage}
            </Text>
          ) : null} */}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
const BACKGROUND_COLOR = "#2A7B9B";
const styles = StyleSheet.create({
  buttonFit: {
    width: "80%",
    marginTop: 10,
  },
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    // marginHorizontal: "auto",
    // marginHorizontal: 5,
    backgroundColor: BACKGROUND_COLOR,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    width: "80%",
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 10,
    width: "80%",
  },
  mainContainer: {
    display: "flex",
    alignItems: "center",
  },
});
