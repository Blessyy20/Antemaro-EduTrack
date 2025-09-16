import { View, Text, StyleSheet, FlatList, TextInput, Pressable } from "react-native";
import { useState } from "react";

export default function Goals() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), text: input }]);
      setInput("");
    }
  };

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
        renderItem={({ item }) => <Text style={styles.task}>• {item.text}</Text>}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 8 },
  button: { backgroundColor: "#682988", padding: 12, borderRadius: 8, alignItems: "center", marginBottom: 20 },
  buttonText: { color: "white", fontWeight: "bold" },
  task: { fontSize: 16, marginBottom: 8 },
});
