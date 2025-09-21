import { View, Text, StyleSheet, FlatList, TextInput, Pressable } from "react-native";
import { useState, useContext } from "react";
import { useRouter } from "expo-router";
import { UserContext } from "../../contexts/UserContext";

export default function Goals() {
  const router = useRouter();
  const { tasks, addTask, editTask, deleteTask } = useContext(UserContext); // ✅ use context

  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleAddTask = async () => {
    if (!input.trim()) return;
    await addTask(input);
    setInput("");
  };

  const handleStartEdit = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const handleSaveEdit = async (id) => {
    if (!editText.trim()) return;
    await editTask(id, editText);
    setEditingId(null);
    setEditText("");
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      {editingId === item.id ? (
        <>
          <TextInput
            style={styles.editInput}
            value={editText}
            onChangeText={setEditText}
          />
          <View style={styles.editButtons}>
            <Pressable style={styles.saveButton} onPress={() => handleSaveEdit(item.id)}>
              <Text style={styles.buttonText}>Save</Text>
            </Pressable>
            <Pressable style={styles.cancelButton} onPress={handleCancelEdit}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.task}>• {item.text}</Text>
          <View style={styles.taskButtons}>
            <Pressable onPress={() => handleStartEdit(item)} style={styles.editButton}>
              <Text style={styles.buttonText}>Edit</Text>
            </Pressable>
            <Pressable onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
              <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 🔙 Back Button */}
      <Pressable style={styles.backButton} onPress={() => router.push("/home")}>
        <Text style={styles.backButtonText}>← Back</Text>
      </Pressable>

      <Text style={styles.title}>💭 To-Do</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter a new task..."
        value={input}
        onChangeText={setInput}
      />

      <Pressable style={styles.button} onPress={handleAddTask}>
        <Text style={styles.buttonText}>Add Task</Text>
      </Pressable>

      <FlatList data={tasks} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    paddingTop: 60, // ⬅ add extra top padding to push content down
    backgroundColor: "#a0b3f3ff" 
  },
  title: { fontSize: 26, textAlign: "center", fontWeight: "bold", marginBottom: 20 },
  backButton: {
    backgroundColor: "#65586bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  backButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 8 },
  button: { backgroundColor: "#682988", padding: 12, borderRadius: 8, alignItems: "center", marginBottom: 20 },
  buttonText: { color: "white", fontWeight: "bold" },
  taskContainer: { backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: "#ddd" },
  task: { fontSize: 16, marginBottom: 8 },
  taskButtons: { flexDirection: "row", justifyContent: "flex-end", gap: 10 },
  editButton: { backgroundColor: "#1e90ff", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6 },
  deleteButton: { backgroundColor: "#ec9797ff", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6 },
  editInput: { borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 6, marginBottom: 10 },
  editButtons: { flexDirection: "row", justifyContent: "flex-end", gap: 10 },
  saveButton: { backgroundColor: "#add6f8ff", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6 },
  cancelButton: { backgroundColor: "#6c757d", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6 },
  cancelText: { color: "white", fontWeight: "bold" },
});
