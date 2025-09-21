import { View, Text, StyleSheet, TextInput, Pressable, FlatList, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../contexts/UserContext";

export default function Schedule() {
  const navigation = useNavigation();
  const { schedules, addSchedule, editSchedule, deleteSchedule } = useContext(UserContext);

  const [subjectInput, setSubjectInput] = useState("");
  const [timeInput, setTimeInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editSubject, setEditSubject] = useState("");
  const [editTime, setEditTime] = useState("");

  const handleAddSchedule = async () => {
    if (!subjectInput.trim() || !timeInput.trim()) return;
    await addSchedule(subjectInput, timeInput);
    setSubjectInput("");
    setTimeInput("");
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setEditSubject(item.subject);
    setEditTime(item.time);
  };

  const saveEdit = async (id) => {
    if (!editSubject.trim() || !editTime.trim()) return;
    await editSchedule(id, editSubject, editTime);
    setEditingId(null);
    setEditSubject("");
    setEditTime("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditSubject("");
    setEditTime("");
  };

  const handleDelete = async (id) => {
    await deleteSchedule(id);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {editingId === item.id ? (
        <>
          <TextInput value={editSubject} onChangeText={setEditSubject} style={styles.input} placeholder="Subject" />
          <TextInput value={editTime} onChangeText={setEditTime} style={styles.input} placeholder="Time" />
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
          <Text style={styles.timeText}>{item.time}</Text>
          <View style={styles.row}>
            <Pressable style={styles.editButton} onPress={() => startEditing(item)}>
              <Text style={styles.buttonText}>Edit</Text>
            </Pressable>
            <Pressable style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
              <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("home")}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>📅 Class Schedule</Text>

      <TextInput style={styles.input} placeholder="Subject" value={subjectInput} onChangeText={setSubjectInput} />
      <TextInput style={styles.input} placeholder="Schedule (Mon & Wed - 10:00 AM)" value={timeInput} onChangeText={setTimeInput} />
      <Pressable style={styles.addButton} onPress={handleAddSchedule}>
        <Text style={styles.buttonText}>Add Schedule</Text>
      </Pressable>

      <FlatList data={schedules} keyExtractor={(item) => item.id} renderItem={renderItem} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#a0b3f3ff", padding: 16 },
  title: { fontSize: 24, textAlign: "center", fontWeight: "bold", marginBottom: 20, color: "#222" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 8, marginBottom: 10, backgroundColor: "#d0d7f5ff" },
  addButton: { backgroundColor: "#65586bff", padding: 12, borderRadius: 10, alignItems: "center", marginBottom: 15 },
  card: { backgroundColor: "#fff", padding: 12, borderRadius: 10, marginBottom: 10 },
  subject: { fontSize: 16, fontWeight: "bold" },
  timeText: { fontSize: 14, color: "#555", marginBottom: 8 },
  row: { flexDirection: "row", justifyContent: "flex-end", gap: 10 },
  editButton: { backgroundColor: "#837afd", padding: 6, borderRadius: 8 },
  deleteButton: { backgroundColor: "#f56565", padding: 6, borderRadius: 8 },
  saveButton: { backgroundColor: "#6fcf97", padding: 6, borderRadius: 8 },
  cancelButton: { backgroundColor: "#6c757d", padding: 6, borderRadius: 8 },
  buttonText: { color: "white", fontWeight: "bold" },
  backButton: { alignSelf: "flex-start", backgroundColor: "#65586bff", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, marginBottom: 10 },
  backText: { fontSize: 16, color: "white", fontWeight: "600" },
});
