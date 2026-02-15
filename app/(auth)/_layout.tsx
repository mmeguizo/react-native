import GlobalMenu from "@/components/navigation/globalMenu"; // Import your component
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

export default function ProtectedLayout() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  // Actions
  const handleLogout = () => {
    setMenuOpen(false);
    router.replace("/");
    Toast.show({
      type: "success",
      text1: "Logout Successful",
    });
  };

  const handleProfile = () => {
    setMenuOpen(false);
    Toast.show({
      type: "info",
      text1: "Profile Coming Soon",
    });
    // router.push("/(protected)/profile");
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#2A7B9B" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
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
      >
        <Stack.Screen name="dashboard" options={{ title: "DASHBOARD" }} />
      </Stack>
      {menuOpen && (
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={() => setMenuOpen(false)}
        />
      )}

      {/* The Actual Menu UI */}
      <GlobalMenu
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        onLogout={handleLogout}
        onProfile={handleProfile}
      />
    </View>
  );
}