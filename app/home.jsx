import { Link, router } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
} from "react-native";

const Home = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>📚 E D U T R A C K</Text>
        <Text style={styles.subtitle}>Stay on track, stay ahead.</Text>

        <View style={styles.grid}>
          <Pressable
            style={styles.button}
            onPress={() => router.push("/(tabs)/profile")}
          >
            <Text style={styles.buttonText}>👩 Profile</Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={() => router.push("/(tabs)/schedule")}
          >
            <Text style={styles.buttonText}>📅 Class Schedule</Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={() => router.push("/(tabs)/attendance")}
          >
            <Text style={styles.buttonText}>📊 Attendance</Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={() => router.push("/(tabs)/to-do")}
          >
            <Text style={styles.buttonText}>💭 To-Do</Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={() => router.push("/(tabs)/grades")}
          >
            <Text style={styles.buttonText}>📝 View Grades</Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={() => router.push("/(tabs)/announcements")}
          >
            <Text style={styles.buttonText}>📢 Announcements</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#c0bbffff",
  },
  scrollContainer: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fffefeff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: "#fffefeff",
    marginBottom: 40,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    marginBottom: 20,
    backgroundColor: "#b4a8c7ff",
    borderRadius: 14,
    width: "47%",
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default Home;
