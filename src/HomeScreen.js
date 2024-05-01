import { StyleSheet, View } from "react-native";
import { Button, Surface, Text } from "react-native-paper";
import PagerView from "react-native-pager-view";
import { CommonActions } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
        padding: 12,
        gap: 12,
      }}
    >
      {/* <ScheduleCard /> */}
      <WorkoutCard exercises={[]} />
      <Button
        icon="plus"
        mode="contained-tonal"
        onPress={() => {
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: "CreateWorkout" }],
            })
          );
          navigation.navigate("CreateWorkout");
        }}
        style={{ width: "100%" }}
      >
        Create a Workout
      </Button>
      <OverviewCard />
      <ScheduleCard />
    </ScrollView>
  );
}

function WorkoutCard({ exercises }) {
  if (exercises.length == 0)
    return (
      <Surface style={styles.surface} elevation={4} mode="flat">
        <Text style={styles.cardHeader}>Start a Workout</Text>
        <Text style={styles.cardText}>Create a workout to get started.</Text>
      </Surface>
    );

  return (
    <Surface style={styles.surface} elevation={4} mode="flat">
      <Text style={styles.cardHeader}>Start a Workout</Text>
      {exercises.map((exercise) => (
        <Button mode="contained-tonal" style={{ width: "100%" }}>
          {exercise}
        </Button>
      ))}
    </Surface>
  );
}

function ScheduleCard({ workout = "" }) {
  return (
    <Surface style={styles.surface} elevation={4} mode="flat">
      <Text style={styles.cardHeader}>Based on your Schedule</Text>
      {workout != "" ? (
        <>
          <Button mode="contained-tonal" style={{ width: "100%" }}>
            Start {workout} workout
          </Button>
        </>
      ) : (
        <>
          <Text style={styles.cardText}>
            You dont have a schedule yet. Create a schedule to get started!
          </Text>
          <Button icon="cog" mode="elevated">
            Configure Schedule
          </Button>
        </>
      )}
    </Surface>
  );
}

function OverviewCard() {
  return (
    <Surface style={styles.surface} elevation={4} mode="flat">
      <Text style={styles.cardHeader}>Overview</Text>
      <PagerView
        style={{
          height: 200,
          width: "100%",
        }}
        initialPage={0}
        collapsable={false}
      >
        <View key="today">
          <CarouselCard>
            <Text style={styles.cardSubheader}>Today's Workout</Text>
            {/*Implement logic*/}
            <Text
              style={{
                fontSize: 40,
              }}
            >
              : &#40;
            </Text>
            <Text style={styles.cardText}>
              You haven't worked out today! Start a workout to see an overview.
            </Text>
          </CarouselCard>
        </View>
        <View key="progress">
          <CarouselCard>
            <Text style={styles.cardSubheader}>Your Progress</Text>
            <Text style={styles.cardText}>Put donut chart here</Text>
          </CarouselCard>
        </View>
        <View key="statistics">
          <CarouselCard>
            <Text style={styles.cardSubheader}>Statistics</Text>
            <Text style={styles.cardText}>
              You have missed ____ number of workouts this week
            </Text>
          </CarouselCard>
        </View>
      </PagerView>
    </Surface>
  );
}

function CarouselCard({ children }) {
  return (
    <Surface style={styles.carouselCard} elevation={1} mode="flat">
      {children}
    </Surface>
  );
}

const styles = StyleSheet.create({
  surface: {
    padding: 16,
    width: "100%",
    borderRadius: 20,
    gap: 8,
  },
  cardHeader: {
    fontSize: 24,
    fontWeight: "bold",
  },
  cardSubheader: {
    fontSize: 20,
  },
  cardText: {
    fontSize: 16,
  },
  button: {
    width: "100%",
  },
  carouselCard: {
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
});
