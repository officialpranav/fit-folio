import React, { useMemo } from "react";
import { useState } from "react";
import {
  MD3LightTheme,
  MD3DarkTheme,
  PaperProvider,
  Text,
} from "react-native-paper";
import PreferencesContext from "./context/PreferencesContext";
import RootNavigator from "./RootNavigator";

export default function Main() {
  const [theme, setTheme] = useState("dark");

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      theme,
    }),
    [theme]
  );

  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={theme === "dark" ? MD3DarkTheme : MD3LightTheme}>
        <RootNavigator />
      </PaperProvider>
    </PreferencesContext.Provider>
  );
}
