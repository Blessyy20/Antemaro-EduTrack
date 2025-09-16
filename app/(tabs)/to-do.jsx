import { View, Text, StyleSheet, FlatList, TextInput, Pressable } from "react-native";
import { useState } from "react";

export default function Goals() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), text: input }]);
      setInput("");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText("");
  };

  const saveEdit = (id) => {
    if (editText.trim()) {
      setTasks(tasks.map((task) => (task.id === id ? { ...task, text: editText } : task)));
      setEditingId(null);
      setEditText("");
    }
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
            <Pressable style={styles.saveButton} onPress={() => saveEdit(item.id)}>
              <Text style={styles.buttonText}>Save</Text>
            </Pressable>
            <Pressable style={styles.cancelButton} onPress={cancelEditing}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.task}>• {item.text}</Text>
          <View style={styles.taskButtons}>
            <Pressable onPress={() => startEditing(item)} style={styles.editButton}>
              <Text style={styles.buttonText}>Edit</Text>
            </Pressable>
            <Pressable onPress={() => deleteTask(item.id)} style={styles.deleteButton}>
              <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💭 To-Do</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter a new task..."
        value={input}
        onChangeText={setInput}
      />

      <Pressable style={styles.button} onPress={addTask}>
        <Text style={styles.buttonText}>Add Task</Text>
      </Pressable>

      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#682988",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: { color: "white", fontWeight: "bold" },
  taskContainer: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  task: { fontSize: 16, marginBottom: 8 },
  taskButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  editButton: {
    backgroundColor: "#1e90ff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  deleteButton: {
    backgroundColor: "#ec9797ff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  editInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
    marginBottom: 10,
  },
  editButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  saveButton: {
    backgroundColor: "#add6f8ff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  cancelButton: {
    backgroundColor: "#6c757d",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  cancelText: { color: "white", fontWeight: "bold" },
});
