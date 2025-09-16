import { View, Text, StyleSheet, FlatList } from "react-native";

const attendanceRecords = [
  { id: "1", date: "Sept 10", status: "Present" },
  { id: "2", date: "Sept 11", status: "Absent" },
  { id: "3", date: "Sept 12", status: "Present" },
  { id: "4", date: "Sept 15", status: "Present" },
  { id: "5", date: "Sept 16", status: "Present" },
];

export default function Attendance() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>📊 Attendance</Text>
      <FlatList
        data={attendanceRecords}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.date}>{item.date}</Text>
            <Text
              style={[
                styles.status,
                { color: item.status === "Present" ? "green" : "red" },
              ]}
            >
              {item.status}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef2ff", // light blue background similar to your image
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  date: {
    fontSize: 16,
    fontWeight: "600",
  },
  status: {
    fontSize: 16,
    marginTop: 4,
  },
});
