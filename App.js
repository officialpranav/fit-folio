import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import "react-native-gesture-handler";
import Main from "./src/Main";
import { useFonts } from "expo-font";
import { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { View } from "react-native";
import { Text } from "react-native";

export default function App() {
  const [loaded] = useFonts({
    GoogleRegular: require("./assets/fonts/ProductSans-Regular.ttf"),
    GoogleBold: require("./assets/fonts/ProductSans-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Main />
    </SafeAreaProvider>
  );
}
