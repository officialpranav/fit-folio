import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import CreateWorkoutScreen from "./CreateWorkoutScreen";

export default function HomeStackNavigator() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CreateWorkout" component={CreateWorkoutScreen} />
    </Stack.Navigator>
  );
}
