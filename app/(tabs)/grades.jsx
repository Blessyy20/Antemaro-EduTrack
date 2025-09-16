import { View, Text, StyleSheet, TextInput, Pressable, FlatList, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function Grades() {
  const navigation = useNavigation();

  const [grades, setGrades] = useState([
    { id: "1", subject: "Mathematics", grade: "90%" },
    { id: "2", subject: "Filipino", grade: "91%" },
    { id: "3", subject: "MAPEH", grade: "81%" },
    { id: "4", subject: "Science", grade: "85%" },
    { id: "5", subject: "English", grade: "88%" },
  ]);

  const [subjectInput, setSubjectInput] = useState("");
  const [gradeInput, setGradeInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editSubject, setEditSubject] = useState("");
  const [editGrade, setEditGrade] = useState("");

  const addGrade = () => {
    if (subjectInput.trim() && gradeInput.trim()) {
      setGrades([
        ...grades,
        {
          id: Date.now().toString(),
          subject: subjectInput,
          grade: gradeInput + "%",
        },
      ]);
      setSubjectInput("");
      setGradeInput("");
    }
  };

  const deleteGrade = (id) => {
    setGrades(grades.filter((item) => item.id !== id));
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setEditSubject(item.subject);
    setEditGrade(item.grade.replace("%", ""));
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditSubject("");
    setEditGrade("");
  };

  const saveEdit = (id) => {
    if (editSubject.trim() && editGrade.trim()) {
      setGrades(
        grades.map((item) =>
          item.id === id
            ? { ...item, subject: editSubject, grade: editGrade + "%" }
            : item
        )
      );
      cancelEditing();
    }
  };

  const getGradeStyle = (gradeString) => {
    const gradeValue = parseInt(gradeString.replace("%", ""));
    if (gradeValue <= 74) {
      return { color: "red" };
    } else if (gradeValue >= 80) {
      return { color: "#682988" };
    } else {
      return { color: "#555" };
    }
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
            value={editGrade}
            onChangeText={setEditGrade}
            placeholder="Grade"
            keyboardType="numeric"
          />
          <View style={styles.row}>
            <Pressable style={styles.saveButton} onPress={() => saveEdit(item.id)}>
              <Text style={styles.buttonText}>Update</Text>
            </Pressable>
            <Pressable style={styles.cancelButton} onPress={cancelEditing}>
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.subject}>
            {item.subject}:{" "}
            <Text style={[styles.grade, getGradeStyle(item.grade)]}>
              {item.grade}
            </Text>
          </Text>
          <View style={styles.row}>
            <Pressable style={styles.editButton} onPress={() => startEditing(item)}>
              <Text style={styles.buttonText}>Edit</Text>
            </Pressable>
            <Pressable style={styles.deleteButton} onPress={() => deleteGrade(item.id)}>
              <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.navigate("home")}
      >
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
      <Pressable style={styles.addButton} onPress={addGrade}>
        <Text style={styles.buttonText}>Add Grade</Text>
      </Pressable>

      <FlatList
        data={grades}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#a0b3f3ff" },
  title: { fontSize: 26, textAlign: "center", fontWeight: "bold", marginBottom: 20 },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },

  addButton: {
    backgroundColor: "#682988",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },

  card: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    marginBottom: 12,
  },
  subject: { fontSize: 18, marginBottom: 10 },
  grade: {
    fontWeight: "bold",
  },

  row: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },

  editButton: {
    backgroundColor: "#9ac8f7ff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  deleteButton: {
    backgroundColor: "#7ea7ffff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  saveButton: {
    backgroundColor: "#7ecef3ff",
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
  buttonText: { color: "white", fontWeight: "bold" },

  /* 🔙 Back Button Style */
  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "#65586bff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 10,
  },
  backText: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
  },
});
