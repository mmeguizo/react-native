import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Dashboard() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  function logout() {
    router.replace("/");
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
          headerRight: () => (
            <TouchableOpacity
              onPress={() => setMenuOpen(!menuOpen)}
              style={{ marginRight: 15 }}
            >
              <MaterialIcons
                name={menuOpen ? "close" : "menu"}
                size={24}
                color="#fff"
              />
            </TouchableOpacity>
          ),
        }}
      />
      {menuOpen && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuOpen(false);
              // router.replace("/profile"); ← add later
            }}
          >
            <MaterialIcons name="person" size={20} color="#333" />
            <Text style={styles.menuText}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              setMenuOpen(false);
              logout();
            }}
          >
            <MaterialIcons name="logout" size={20} color="#c0392b" />
            <Text style={[styles.menuText, { color: "#c0392b" }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
      <SafeAreaView style={styles.container}>
        <Pressable style={{ flex: 1 }} onPress={() => setMenuOpen(false)}>
          <View style={styles.mainContainer}>
            <Text style={styles.text}>Dashboard</Text>
            {/* <Button title="Logout" onPress={logout} /> */}
          </View>
        </Pressable>
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
  dropdownMenu: {
    position: "absolute",
    top: 0,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 5,
    width: 160,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    zIndex: 100,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
});
