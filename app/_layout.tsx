import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      {/* We add 'headerShown: false' here so the Root Stack 
         doesn't show a header. We want the nested layouts 
         ((protected) or index) to control their own headers.
      */}
      <Stack screenOptions={{ headerShown: false }} />
      <Toast />
    </>
  );
}
