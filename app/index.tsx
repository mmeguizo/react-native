import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
export default function Index() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const staticUsername = "Admin";
  const staticPassword = "Password123!";

  function verifyUser() {
    let message =
      username !== staticUsername || password !== staticPassword
        ? "Invalid Credentials"
        : "Login Successful";
    if (Platform.OS === "web") {
      window.alert(message);
      router.replace("/dashboard");
    } else {
      Alert.alert(message);
      router.replace("/dashboard");
    }
    // Alert.alert(message);
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
