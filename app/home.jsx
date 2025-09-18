import { Link } from "expo-router";
import { View, Text, StyleSheet, Pressable } from "react-native";

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📚 E D U T R A C K</Text>
      <Text style={styles.subtitle}>Stay on track, stay ahead.</Text>

      <View style={styles.grid}>
        <Link href="/profile" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>👩 Profile</Text>
          </Pressable>
        </Link>

        <Link href="/schedule" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>📅 Class Schedule</Text>
          </Pressable>
        </Link>

        <Link href="/attendance" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>📊 Attendance</Text>
          </Pressable>
        </Link>

        <Link href="/to-do" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>💭 To-Do</Text>
          </Pressable>
        </Link>

        <Link href="/grades" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>📝 View Grades</Text>
          </Pressable>
        </Link>

        <Link href="/announcements" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>📢 Announcements</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#c0bbffff",
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
    justifyContent: "center",
  },
  button: {
    margin: 10,
    paddingVertical: 14,
    paddingHorizontal: 24,
    backgroundColor: "#b4a8c7ff",
    borderRadius: 14,
    width: 150,
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
