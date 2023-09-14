import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import PreferencesContext from "./context/PreferencesContext";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const { toggleTheme } = React.useContext(PreferencesContext);

  return (
    <SafeAreaView>
      <Button onPress={toggleTheme}>Change Theme</Button>
    </SafeAreaView>
  );
}
