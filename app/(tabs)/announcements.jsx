import React, { useContext, useState } from "react";
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
import { SafeAreaView } from "react-native-safe-area-context"; // ✅ import
import { useRouter } from "expo-router";
import { UserContext } from "../../contexts/UserContext";

export default function Announcements() {
  const router = useRouter();
  const {
    announcements,
    addAnnouncement,
    editAnnouncement,
    deleteAnnouncement,
  } = useContext(UserContext);

  const EMOJI = "📢 ";
  const [inputText, setInputText] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleSave = async () => {
    let text = inputText.trim();
    if (!text) {
      Alert.alert("Oops!", "Please enter an announcement.");
      return;
    }
    if (!text.startsWith(EMOJI)) text = EMOJI + text;

    if (editingId) {
      await editAnnouncement(editingId, text);
      setEditingId(null);
    } else {
      await addAnnouncement(text);
    }
    setInputText("");
  };

  const handleDelete = (id) => {
      deleteAnnouncement(id)
  }
  

  const handleEdit = (item) => {
    setEditingId(item.id);
    setInputText(item.text);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#a0b3f3ff" }}>
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

        {/* Input + Button */}
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

        {/* List */}
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
                  <Text style={[styles.actionText, { color: "#fff" }]}>
                    Edit
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: "#f87171" }]}
                  onPress={() => handleDelete(item.id)}
                >
                  <Text style={[styles.actionText, { color: "#fff" }]}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20, // ✅ gives breathing space
  },
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
