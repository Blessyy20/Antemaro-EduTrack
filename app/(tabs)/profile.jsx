import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useUser } from "../../hooks/useUser";

export default function Profile() {
  const { currentUser, updateUserAvatar, loading } = useUser();

  const pickImage = async () => {
    if (!currentUser) return;

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission required", "Please allow access to gallery.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      const avatarUri = result.assets[0].uri;
      try {
        await updateUserAvatar(currentUser.id, avatarUri);
        Alert.alert("✅ Success", "Profile picture updated!");
      } catch (e) {
        console.error(e);
        Alert.alert("❌ Error", "Failed to update profile picture.");
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  if (!currentUser) {
    return (
      <View style={styles.center}>
        <Text>No user logged in</Text>
        <Pressable
          style={[styles.button, { backgroundColor: "#e06666" }]}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.buttonText}>Go to Login</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#a0b3f3ff" }}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar */}
        <Pressable style={styles.avatarContainer} onPress={pickImage}>
          {currentUser.avatar ? (
            <Image source={{ uri: currentUser.avatar }} style={styles.avatar} />
          ) : (
            <Text style={styles.avatarEmoji}>👤</Text>
          )}
        </Pressable>
        <Text style={styles.avatarHint}>Tap to change avatar</Text>

        {/* Info Cards */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Name</Text>
          <Text style={styles.cardValue}>{currentUser.name}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Email</Text>
          <Text style={styles.cardValue}>{currentUser.email}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Strand</Text>
          <Text style={styles.cardValue}>{currentUser.strand}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>Grade</Text>
          <Text style={styles.cardValue}>{currentUser.grade}</Text>
        </View>

        {/* Logout */}
        <Pressable
          style={[styles.button, { backgroundColor: "#e06666", marginTop: 30 }]}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.buttonText}>🚪 Log Out</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: { alignItems: "center", paddingHorizontal: 20, paddingTop: 40 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  avatarContainer: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "#e0e0ff",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#6C63FF",
  },
  avatar: { width: 130, height: 130, borderRadius: 65 },
  avatarEmoji: { fontSize: 60 },
  avatarHint: { marginTop: 8, fontSize: 14, color: "#555" },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  cardLabel: { fontSize: 14, fontWeight: "600", color: "#666" },
  cardValue: { fontSize: 16, fontWeight: "500", color: "#333", marginTop: 4 },
  button: {
    width: "90%",
    padding: 14,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
