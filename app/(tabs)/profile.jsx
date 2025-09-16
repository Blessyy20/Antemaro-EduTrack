import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const navigation = useNavigation();

  const user = {
    name: "Bless Abegail",
    email: "blessabie@gmail.com",
    strand: "Humanities and Social Sciences",
    grade: "12",
  };

  return (
    <View style={styles.container}>
      {/* Back Button - Always on top */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.navigate("home")}
        >
          <Text style={styles.backText}>⬅ Back</Text>
        </Pressable>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Avatar as Emoji */}
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarEmoji}>👩</Text>
        </View>

        {/* Info Boxes */}
        <View style={styles.infoBox}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.info}>{user.name}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.info}>{user.email}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Strand</Text>
          <Text style={styles.info}>{user.strand}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Grade</Text>
          <Text style={styles.info}>{user.grade}</Text>
        </View>

        {/* Log Out Button */}
        <Pressable
          style={styles.logoutButton}
          onPress={() => navigation.navigate("login")}
        >
          <Text style={styles.logoutText}>🚪 Log Out</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 5,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "#65586bff",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  backText: { fontSize: 16, color: "white", fontWeight: "600" },

  scrollContent: {
    alignItems: "center",
    padding: 20,
    paddingTop: 10,
  },

  avatarCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#f3e8ff",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    borderWidth: 2,
    borderColor: "#c084fc",
  },
  avatarEmoji: { fontSize: 60 },

  infoBox: {
    width: "100%",
    backgroundColor: "#f9f9ff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#c7d2fe",
  },
  label: { fontSize: 14, fontWeight: "600", color: "#333" },
  info: { fontSize: 16, color: "#555" },

  logoutButton: {
    marginTop: 30,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: "#f0b0f0",
    borderRadius: 10,
  },
  logoutText: { color: "white", fontSize: 16, fontWeight: "600" },
});
