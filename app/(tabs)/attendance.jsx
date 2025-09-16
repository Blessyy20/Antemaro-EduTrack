import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

const initialAttendance = [
  { id: "1", date: "Sept 10", status: "Present" },
  { id: "2", date: "Sept 11", status: "Absent" },
  { id: "3", date: "Sept 12", status: "Present" },
  { id: "4", date: "Sept 15", status: "Present" },
  { id: "5", date: "Sept 16", status: "Present" },
];

export default function Attendance() {
  const [attendanceRecords, setAttendanceRecords] = useState(initialAttendance);
  const [dateInput, setDateInput] = useState("");
  const [statusInput, setStatusInput] = useState("Present"); // default status

  const addAttendance = () => {
    if (dateInput.trim()) {
      setAttendanceRecords([
        ...attendanceRecords,
        {
          id: Date.now().toString(),
          date: dateInput.trim(),
          status: statusInput,
        },
      ]);
      setDateInput("");
      setStatusInput("Present");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📊 Attendance</Text>

      {/* Minimalist Input Box */}
      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="Date (e.g., Sept 20)"
          placeholderTextColor="#999"
          value={dateInput}
          onChangeText={setDateInput}
        />

        <View style={styles.statusButtons}>
          {["Present", "Absent"].map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.statusButton,
                statusInput === status && styles.statusButtonActive,
              ]}
              onPress={() => setStatusInput(status)}
            >
              <Text
                style={[
                  styles.statusText,
                  statusInput === status && styles.statusTextActive,
                ]}
              >
                {status}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Pressable style={styles.addButton} onPress={addAttendance}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>

      {/* Attendance List */}
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
    backgroundColor: "#a0b3f3ff", // light blue background
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#222",
  },

  inputSection: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },

  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 14,
    color: "#333",
  },

  statusButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 14,
  },

  statusButton: {
    paddingVertical: 8,
    paddingHorizontal: 28,
    borderRadius: 20,
    backgroundColor: "#eee",
  },
  statusButtonActive: {
    backgroundColor: "#65586bff",
  },

  statusText: {
    fontWeight: "600",
    color: "#555",
    fontSize: 16,
  },
  statusTextActive: {
    color: "white",
  },

  addButton: {
    backgroundColor: "#aa84bdff",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
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
    flexDirection: "row",
    justifyContent: "space-between",
  },

  date: {
    fontSize: 16,
    fontWeight: "600",
  },

  status: {
    fontSize: 16,
    fontWeight: "600",
  },
});
