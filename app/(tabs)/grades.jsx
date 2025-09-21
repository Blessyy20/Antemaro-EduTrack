import { View, Text, TextInput, Pressable, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../contexts/UserContext";

export default function Grades() {
  const navigation = useNavigation();
  const { grades, addGrade, editGrade, deleteGrade } = useContext(UserContext);

  const [subjectInput, setSubjectInput] = useState("");
  const [gradeInput, setGradeInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editSubject, setEditSubject] = useState("");
  const [editGradeInput, setEditGradeInput] = useState("");

  const handleAddGrade = async () => {
    if (!subjectInput.trim() || !gradeInput.trim()) return;
    await addGrade(subjectInput, gradeInput);
    setSubjectInput("");
    setGradeInput("");
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setEditSubject(item.subject);
    setEditGradeInput(item.grade.replace("%", ""));
  };

  const saveEdit = async (id) => {
    await editGrade(id, editSubject, editGradeInput);
    setEditingId(null);
    setEditSubject("");
    setEditGradeInput("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditSubject("");
    setEditGradeInput("");
  };

  const handleDelete = async (id) => {
    await deleteGrade(id);
  };

  const getGradeStyle = (gradeString) => {
    const gradeValue = parseInt(gradeString.replace("%", ""));
    if (gradeValue <= 74) return { color: "red" };
    if (gradeValue >= 80) return { color: "#682988" };
    return { color: "#222" };
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {editingId === item.id ? (
        <>
          <TextInput
            style={styles.input}
            value={editSubject}
            onChangeText={setEditSubject}
            placeholder="Subject"
          />
          <TextInput
            style={styles.input}
            value={editGradeInput}
            onChangeText={setEditGradeInput}
            placeholder="Grade"
            keyboardType="numeric"
          />
          <View style={styles.row}>
            <Pressable style={styles.saveButton} onPress={() => saveEdit(item.id)}>
              <Text style={styles.buttonText}>Update</Text>
            </Pressable>
            <Pressable style={styles.cancelButton} onPress={cancelEdit}>
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.subject}>
            {item.subject}:{" "}
            <Text style={[styles.grade, getGradeStyle(item.grade)]}>{item.grade}</Text>
          </Text>
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

      <Text style={styles.title}>📝 View Grades</Text>

      <TextInput
        style={styles.input}
        placeholder="Subject"
        value={subjectInput}
        onChangeText={setSubjectInput}
      />
      <TextInput
        style={styles.input}
        placeholder="Grade (%)"
        value={gradeInput}
        onChangeText={setGradeInput}
        keyboardType="numeric"
      />
      <Pressable style={styles.addButton} onPress={handleAddGrade}>
        <Text style={styles.buttonText}>Add Grade</Text>
      </Pressable>

      <FlatList data={grades} keyExtractor={(item) => item.id} renderItem={renderItem} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#a0b3f3ff", padding: 16 },
  title: { fontSize: 24, textAlign: "center", fontWeight: "bold", marginBottom: 20, color: "#222" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 8, marginBottom: 10, backgroundColor: "#d0d7f5ff" },
  addButton: { backgroundColor: "#65586bff", padding: 12, borderRadius: 10, alignItems: "center", marginBottom: 15 },
  card: { backgroundColor: "#fff", padding: 12, borderRadius: 10, marginBottom: 10 },
  subject: { fontSize: 16, marginBottom: 8 },
  grade: { fontWeight: "bold" },
  row: { flexDirection: "row", justifyContent: "flex-end", gap: 10 },
  editButton: { backgroundColor: "#837afd", padding: 6, borderRadius: 8 },
  deleteButton: { backgroundColor: "#f56565", padding: 6, borderRadius: 8 },
  saveButton: { backgroundColor: "#6fcf97", padding: 6, borderRadius: 8 },
  cancelButton: { backgroundColor: "#6c757d", padding: 6, borderRadius: 8 },
  buttonText: { color: "white", fontWeight: "bold" },
  backButton: { alignSelf: "flex-start", backgroundColor: "#65586bff", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, marginBottom: 10 },
  backText: { fontSize: 16, color: "white", fontWeight: "600" },
});
