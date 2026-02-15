import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type GlobalMenuProps = {
  visible: boolean;
  onClose: () => void;
  onLogout: () => void;
  onProfile: () => void;
};

export default function GlobalMenu({ visible, onClose, onLogout, onProfile }: GlobalMenuProps) {
  const insets = useSafeAreaInsets(); // Get the notch/status bar height

  if (!visible) return null;

  return (
    <View
      style={[
        styles.dropdownMenu,
        {
          // Dynamic Positioning:
          // 50 is roughly the height of the Header. 
          // We add 'insets.top' to account for the Status Bar/Notch on your Samsung.
          top: 50 + insets.top
        }
      ]}
    >
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
          onClose();
          onProfile();
        }}
      >
        <MaterialIcons name="person" size={24} color="#333" />
        <Text style={styles.menuText}>Profile</Text>
      </TouchableOpacity>

      {/* Divider Line */}
      <View style={styles.divider} />

      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
          onClose();
          onLogout();
        }}
      >
        <MaterialIcons name="logout" size={24} color="#c0392b" />
        <Text style={[styles.menuText, { color: "#c0392b" }]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownMenu: {
    position: "absolute",
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 12, // Softer corners
    paddingVertical: 8,

    // FIX 1: Width Issues
    minWidth: 220,    // Starts wider to fit "Logout" easily
    // width: "auto",    // Allows it to grow if you add longer words later

    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,

    // Shadow for Android (Elevation)
    elevation: 8,
    zIndex: 1000,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14, // Taller touch target
    paddingHorizontal: 16,
    flexShrink: 0,
  },
  menuText: {
    fontSize: 16, // Readable size
    fontWeight: "500",
    marginLeft: 12,
    color: "#333",
    // flexShrink: 1, // Ensures text doesn't push icon out
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginHorizontal: 10,
  }
});