import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import CreateWorkoutStackNavigator from "./CreateWorkoutNavigator";

export default function HomeStackNavigator() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CreateWorkout" component={CreateWorkoutStackNavigator} />
    </Stack.Navigator>
  );
}
