import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";

export default function Announcements() {
  const router = useRouter();
  const EMOJI = "📢 ";

  const [announcements, setAnnouncements] = useState([
    { id: "1", text: "📢 No classes on Friday (Holiday)" },
    { id: "2", text: "📢 Midterm exams start next week" },
    { id: "3", text: "📢 Submission for projects is Sept 30" },
  ]);
  const [inputText, setInputText] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleSave = () => {
    let text = inputText.trim();
    if (!text) {
      Alert.alert("Oops!", "Please enter an announcement.");
      return;
    }

    if (!text.startsWith(EMOJI)) {
      text = EMOJI + text;
    }

    if (editingId) {
      setAnnouncements((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...item, text } : item
        )
      );
      setEditingId(null);
    } else {
      const newAnn = { id: Date.now().toString(), text };
      setAnnouncements((prev) => [newAnn, ...prev]);
    }
    setInputText("");
  };

  const handleDelete = (id) => {
    Alert.alert("Delete announcement?", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          setAnnouncements((prev) => prev.filter((item) => item.id !== id));
          if (editingId === id) {
            setEditingId(null);
            setInputText("");
          }
        },
      },
    ]);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setInputText(item.text);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      {/* 🔙 Back Button */}
      <TouchableOpacity
        onPress={() => router.push("/home")}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.header}>📢 Announcements</Text>

      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Write your announcement..."
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>
            {editingId ? "Update" : "Add"}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={announcements}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>{item.text}</Text>
            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: "#74a4fcff" }]}
                onPress={() => handleEdit(item)}
              >
                <Text style={[styles.actionText, { color: "#fff" }]}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a0b3f3ff",
    padding: 20,
  },
  /* 🔙 Same back button style as Attendance */
  backButton: {
    backgroundColor: "#65586bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#222",
    textAlign: "center",
  },
  inputWrapper: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
  },
  button: {
    backgroundColor: "#877bfcff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginLeft: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginBottom: 14,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginLeft: 12,
  },
  actionText: {
    fontWeight: "600",
    fontSize: 15,
  },
});
