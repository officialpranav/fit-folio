import React, { useEffect } from "react";
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

export default function CreateWorkoutScreen({ navigation, route }) {
  const [workoutNamePortalVisible, setWorkoutNamePortalVisible] = React.useState(false);
  const [exerciseNamePortalVisible, setExerciseNamePortalVisible] = React.useState(false);
  const [selectedExerciseIndex, setSelectedExerciseIndex] = React.useState(0);
  const [workoutName, setWorkoutName] = React.useState("Unnamed Workout");
  const [workoutList, setWorkoutList] = React.useState([]);

  function handleUpdateExercise(exerciseIndex, type, params = null) {
    if(!workoutList[exerciseIndex]) return;

    let currentWorkoutList;
    switch (type) {
      case "name":
        setSelectedExerciseIndex(exerciseIndex);
        setExerciseNamePortalVisible(true);
        break;
      case "addSet":
        currentWorkoutList = [...workoutList];
        currentWorkoutList[exerciseIndex].sets = [...currentWorkoutList[exerciseIndex].sets, {reps: 1, weight: 1}];
        setWorkoutList(currentWorkoutList);
        break;
      case "changeReps":
        currentWorkoutList = [...workoutList];
        currentWorkoutList[exerciseIndex].reps = params.reps;
        setWorkoutList(currentWorkoutList);
        break;
      case "changeWeight":
        currentWorkoutList = [...workoutList];
        currentWorkoutList[exerciseIndex].weight = params.weight;
        setWorkoutList(currentWorkoutList);
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    if (route.params?.exercise) {
      setWorkoutList([
        ...workoutList,
        {
          name: route.params?.exercise,
          sets: [{reps: 1, weight: 1}]
        },
      ]);
    }

  }, [route.params?.exercise])

  const showModal = () => setWorkoutNamePortalVisible(true);
  const hideModal = () => setWorkoutNamePortalVisible(false);

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
            fontWeight: "bold",
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
          <Modal visible={workoutNamePortalVisible} onDismiss={hideModal}>
            <Surface
              style={[styles.surface, { margin: 16 }]}
              elevation={5}
              mode="flat"
            >
              <Text style={{ fontWeight: "bold", fontSize: 22 }}>
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
        <Portal>
          <Modal visible={exerciseNamePortalVisible} onDismiss={() => { setExerciseNamePortalVisible(false) }}>
            <Surface
              style={[styles.surface, { margin: 16 }]}
              elevation={5}
              mode="flat"
            >
              <Text style={{ fontWeight: "bold", fontSize: 22 }}>
                Rename Exercise:
              </Text>
              <TextInput
                label="Enter a name for your exercise"
                mode="outlined"
                value={workoutList[selectedExerciseIndex]?.name || "unnamed"}
                onChangeText={(value) => {
                  if (workoutList[selectedExerciseIndex]) {
                    let currentWorkoutList = [...workoutList];
                    currentWorkoutList[selectedExerciseIndex].name = value;
                    setWorkoutList(currentWorkoutList);
                  }
                }}
              ></TextInput>
              <View style={styles.modal}>
                <Button onPress={() => { setExerciseNamePortalVisible(false) }}>Ok</Button>
              </View>
            </Surface>
          </Modal>
        </Portal>
        <ExerciseList exercises={workoutList} handleUpdateExercise={handleUpdateExercise} />
        <Button icon="plus" mode="contained-tonal" onPress={() => {
          navigation.navigate("SelectExerciseScreen");
        }}>
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

function SetCard({ set, setIndex, exerciseIndex, handleUpdateExercise }) {
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
      <Text>Set {setIndex + 1}</Text>
      <InputSpinner
        value={set.reps}
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
        onChange={(num) => {
          handleUpdateExercise(exerciseIndex, "changeReps", { reps: num });
        }}
      />
      <InputSpinner
        value={set.weight}
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
        onChange={(num) => {
          handleUpdateExercise(exerciseIndex, "changeWeight", { reps: num });
        }}
      />
    </View>
  );
}

function ExcerciseCard({ name, sets, handleUpdateExercise, exerciseIndex }) {
  const { colors, dark } = useTheme();

  return (
    <View>
      <Surface style={styles.surface} elevation={4} mode="flat">
        <View
          style={{
            borderBottomColor: dark ? "white" : "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        >
          <Text style={styles.cardSubheader} onPress={() => {
            handleUpdateExercise(exerciseIndex, "name")
          }}>
            {name}
          </Text>
        </View>
        <View>{
          sets.map((set, index) => (
            <SetCard set={set} exerciseIndex={exerciseIndex} key={index} setIndex={index} handleUpdateExercise={handleUpdateExercise}/>
          ))
        }</View>
        <Button
          onPress={() => {
            handleUpdateExercise(exerciseIndex, "addSet");
          }}
        >
          Add a set
        </Button>
      </Surface>
    </View>
  );
}

function ExerciseList({ exercises, handleUpdateExercise }) {
  return (
    <View style={{ gap: 12 }}>
      {exercises.map((exercise, index) => (
        <ExcerciseCard
          name={exercise.name}
          sets={exercise.sets}
          exerciseIndex={index}
          key={index}
          handleUpdateExercise={handleUpdateExercise}
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
    fontWeight: "bold",
  },
  cardText: {
    fontSize: 16,
  },
});
