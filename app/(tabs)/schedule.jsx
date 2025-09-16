import { View, Text, StyleSheet, TextInput, Pressable, FlatList } from "react-native";
import { useState } from "react";

export default function Schedule() {
  const [schedules, setSchedules] = useState([
    { id: "1", subject: "Mathematics", time: "Monday & Wednesday - 9:00 AM" },
    { id: "2", subject: "Filipino", time: "Monday & Wednesday - 8:00 AM" },
    { id: "3", subject: "MAPEH", time: "Monday & Wednesday - 2:00 PM" },
    { id: "4", subject: "Science", time: "Tuesday & Thursday - 10:30 AM" },
    { id: "5", subject: "English", time: "Friday - 1:00 PM" },
  ]);

  const [subjectInput, setSubjectInput] = useState("");
  const [timeInput, setTimeInput] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editSubject, setEditSubject] = useState("");
  const [editTime, setEditTime] = useState("");

  const addSchedule = () => {
    if (subjectInput.trim() && timeInput.trim()) {
      setSchedules([
        ...schedules,
        {
          id: Date.now().toString(),
          subject: subjectInput,
          time: timeInput,
        },
      ]);
      setSubjectInput("");
      setTimeInput("");
    }
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setEditSubject(item.subject);
    setEditTime(item.time);
  };

  const saveEdit = (id) => {
    if (editSubject.trim() && editTime.trim()) {
      setSchedules(
        schedules.map((item) =>
          item.id === id
            ? { ...item, subject: editSubject, time: editTime }
            : item
        )
      );
      setEditingId(null);
      setEditSubject("");
      setEditTime("");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditSubject("");
    setEditTime("");
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {editingId === item.id ? (
        <>
          <TextInput
            value={editSubject}
            onChangeText={setEditSubject}
            style={styles.smallInput}
            placeholder="Subject"
          />
          <TextInput
            value={editTime}
            onChangeText={setEditTime}
            style={styles.smallInput}
            placeholder="Schedule"
          />
          <View style={styles.row}>
            <Pressable style={styles.saveButton} onPress={() => saveEdit(item.id)}>
              <Text style={styles.buttonText}>Save</Text>
            </Pressable>
            <Pressable style={styles.cancelButton} onPress={cancelEdit}>
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.subject}>{item.subject}</Text>
          <Text>{item.time}</Text>
          <Pressable style={styles.editButton} onPress={() => startEditing(item)}>
            <Text style={styles.buttonText}>Edit</Text>
          </Pressable>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📅 Class Schedule</Text>

      <TextInput
        style={styles.input}
        placeholder="Subject"
        value={subjectInput}
        onChangeText={setSubjectInput}
      />
      <TextInput
        style={styles.input}
        placeholder="Schedule (e.g., Mon & Wed - 10:00 AM)"
        value={timeInput}
        onChangeText={setTimeInput}
      />
      <Pressable style={styles.addButton} onPress={addSchedule}>
        <Text style={styles.buttonText}>Add Schedule</Text>
      </Pressable>

      <FlatList
        data={schedules}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#a0b3f3ff" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
    marginBottom: 10,
    fontSize: 14,
  },

  addButton: {
    backgroundColor: "#4b3ca5",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  subject: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },

  smallInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 6,
    borderRadius: 6,
    fontSize: 14,
    marginBottom: 8,
  },

  row: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },

  editButton: {
    backgroundColor: "#515ab1ff",
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: "flex-end",
  },
  saveButton: {
    backgroundColor: "#837afdff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  cancelButton: {
    backgroundColor: "#7396b4ff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 13,
  },
});
