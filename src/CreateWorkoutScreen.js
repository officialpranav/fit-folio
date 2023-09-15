import React from "react";
import { StyleSheet, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import {
  Button,
  Modal,
  Portal,
  Surface,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";

export default function CreateWorkoutScreen() {
  const [visible, setVisible] = React.useState(false);
  const [workoutName, setWorkoutName] = React.useState("Unnamed Workout");
  const [workoutList, setWorkoutList] = React.useState([]);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const { colors } = useTheme();

  return (
    <View style={{ padding: 12 }}>
      <View
        style={{
          borderBottomColor: colors.inversePrimary,
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      >
        <Text
          key="workoutName"
          onPress={showModal}
          style={{
            fontFamily: "GoogleBold",
            fontSize: 35,
          }}
        >
          {workoutName}
        </Text>
      </View>
      <ScrollView contentContainerStyle={{ gap: 12 }}>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal}>
            <Surface style={styles.surface} elevation={5} mode="flat">
              <Text style={{ fontFamily: "GoogleBold", fontSize: 22 }}>
                Rename Workout:
              </Text>
              <TextInput
                label="Enter a name for your workout"
                mode="outlined"
                value={workoutName}
                onChangeText={setWorkoutName}
              ></TextInput>
              <View style={styles.modal}>
                <Button onPress={hideModal}>Ok</Button>
              </View>
            </Surface>
          </Modal>
        </Portal>
        <ExerciseFlatList exercises={workoutList} />
        <Button
          icon="plus"
          mode="contained-tonal"
          onPress={() => {
            setWorkoutList([
              ...workoutList,
              { name: "pushup", sets: 2, reps: 2, weight: 3 },
            ]);
          }}
        >
          Add an exercise
        </Button>
        <Button
          icon="plus"
          mode="contained-tonal"
          onPress={() => {
            setWorkoutList([]);
          }}
        >
          Clear
        </Button>
      </ScrollView>
    </View>
  );
}

function ExcerciseCard({ name, sets, reps, weight }) {
  return (
    <Surface style={styles.surface} elevation={4} mode="flat">
      <Text style={styles.cardHeader}>{name}</Text>
      <Text style={styles.cardText}>
        {sets} sets of {reps} reps at {weight} lbs
      </Text>
    </Surface>
  );
}

function ExerciseFlatList({ exercises }) {
  return (
    <FlatList
      data={exercises}
      renderItem={({ item }) => (
        <ExcerciseCard
          name={item.name}
          sets={item.sets}
          reps={item.reps}
          weight={item.weight}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  surface: {
    padding: 16,
    borderRadius: 20,
    gap: 8,
  },
  modal: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
