import { createStackNavigator } from "@react-navigation/stack";
import CreateWorkoutScreen from "./CreateWorkoutScreen";
import SelectExerciseScreen from "./SelectExerciseScreen";

export default function CreateWorkoutStackNavigator() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="CreateWorkoutScreen" screenOptions={{headerShown: false}}>
      <Stack.Screen name="CreateWorkoutScreen" component={CreateWorkoutScreen} />
      <Stack.Screen name="SelectExerciseScreen" component={SelectExerciseScreen} />
    </Stack.Navigator>
  );
}
