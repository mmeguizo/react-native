import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Dashboard() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.mainContainer}>
          <Text style={styles.text}>Dashboard Content</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const BACKGROUND_COLOR = "#2A7B9B";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: BACKGROUND_COLOR,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  mainContainer: {
    alignItems: "center",
  },
});