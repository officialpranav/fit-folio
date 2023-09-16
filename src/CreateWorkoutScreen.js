import React from "react";
import { StyleSheet, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import InputSpinner from "react-native-input-spinner";
import {
  Button,
  IconButton,
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
  const handleAddExercise = () => {
    setWorkoutList([
      ...workoutList,
      {
        name: "Curls",
        sets: 0,
        reps: 0,
        weight: 0,
        index: workoutList.length,
      },
    ]);
  };
  const handleClearExercises = () => {
    setWorkoutList([]);
  };

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const { dark } = useTheme();

  return (
    <View style={{ height: "100%" }}>
      <View
        style={{
          borderBottomColor: dark ? "white" : "black",
          borderBottomWidth: StyleSheet.hairlineWidth,
          marginTop: 12,
          marginLeft: 12,
          marginRight: 12,
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
      <ScrollView
        style={{ height: "100%" }}
        contentContainerStyle={{
          gap: 12,
          padding: 12,
        }}
      >
        <Portal>
          <Modal visible={visible} onDismiss={hideModal}>
            <Surface
              style={[styles.surface, { margin: 16 }]}
              elevation={5}
              mode="flat"
            >
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
        <ExerciseList exercises={workoutList} />
        <Button icon="plus" mode="contained-tonal" onPress={handleAddExercise}>
          Add an exercise
        </Button>
        <Button
          icon="plus"
          mode="contained-tonal"
          onPress={handleClearExercises}
        >
          Clear
        </Button>
      </ScrollView>
    </View>
  );
}

function SetCard() {
  let { colors, dark } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        margin: 4,
        gap: 8,
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <Text>Set 1</Text>
      <InputSpinner
        max={500}
        skin="paper"
        background="transparent"
        textColor={dark ? "white" : "black"}
        append={<Text>reps&nbsp;</Text>}
        style={{
          height: 40,
          borderRadius: 20,
          backgroundColor: colors.surface,
        }}
      />
      <InputSpinner
        max={9000}
        type="float"
        step={2.5}
        skin="paper"
        background="transparent"
        textColor={dark ? "white" : "black"}
        prepend={<Text>&nbsp;</Text>}
        append={<Text>lbs&nbsp;&nbsp;</Text>}
        style={{
          height: 40,
          borderRadius: 20,
          backgroundColor: colors.surface,
        }}
      />
    </View>
  );
}

function ExcerciseCard({ name, sets, reps, weight, index }) {
  const [exerciseName, setExerciseName] = React.useState(name);
  const [visible, setVisible] = React.useState(false);
  const [numSets, setNumSets] = React.useState(1);

  let { dark } = useTheme();

  const hideModal = () => {
    setVisible(false);
  };
  const showModal = () => setVisible(true);

  return (
    <View>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal}>
          <Surface
            style={[styles.surface, { margin: 16 }]}
            elevation={5}
            mode="flat"
          >
            <Text style={{ fontFamily: "GoogleBold", fontSize: 22 }}>
              Rename Exercise:
            </Text>
            <TextInput
              label="Enter a name for your exercise"
              mode="outlined"
              value={exerciseName}
              onChangeText={setExerciseName}
            ></TextInput>
            <View style={styles.modal}>
              <Button onPress={hideModal}>Ok</Button>
            </View>
          </Surface>
        </Modal>
      </Portal>
      <Surface style={styles.surface} elevation={4} mode="flat">
        <View>
          <View
            style={{
              borderBottomColor: dark ? "white" : "black",
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          >
            <Text style={styles.cardSubheader} onPress={showModal}>
              {exerciseName}
            </Text>
          </View>
          <View>{Array(numSets).fill(<SetCard />)}</View>
          <Button
            onPress={() => {
              setNumSets(numSets + 1);
            }}
          >
            Add a set
          </Button>
        </View>
      </Surface>
    </View>
  );
}

function ExerciseList({ exercises }) {
  return (
    <View style={{ gap: 12 }}>
      {exercises.map((exercise) => (
        <ExcerciseCard
          name={exercise.name}
          sets={exercise.sets}
          reps={exercise.reps}
          weight={exercise.weight}
          index={exercise.index}
          key={exercise.index}
        />
      ))}
    </View>
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
  cardSubheader: {
    fontSize: 20,
    fontFamily: "GoogleBold",
  },
  cardText: {
    fontSize: 16,
    fontFamily: "GoogleRegular",
  },
});
