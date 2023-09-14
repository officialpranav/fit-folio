import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { adaptNavigationTheme, useTheme } from "react-native-paper";
import HomeStackNavigator from "./HomeNavigator";
import SettingsScreen from "./SettingsScreen";
import CalendarScreen from "./CalendarScreen";

export default function RootNavigator() {
  const theme = useTheme();
  const Tab = createMaterialBottomTabNavigator();

  const themes = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });
  return (
    <NavigationContainer
      theme={theme.dark ? themes.DarkTheme : themes.LightTheme}
    >
      <Tab.Navigator initialRouteName="HomeNavigator">
        <Tab.Screen
          name="HomeNavigator"
          component={HomeStackNavigator}
          options={{ tabBarIcon: "home", title: "Home" }}
        />
        <Tab.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{ tabBarIcon: "calendar", title: "Journal" }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ tabBarIcon: "cog" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
