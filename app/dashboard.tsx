import { Stack, useRouter } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Dashboard() {
  const router = useRouter();

  function logout() {
    router.push("/");
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
          headerTitle: "DASHBOARD",
          headerTitleAlign: "center",
        }}
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.mainContainer}>
          <Text style={styles.text}>Dashboard</Text>
          <Button title="Logout" onPress={logout} />
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
