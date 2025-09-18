import React, { useEffect, useState } from "react";
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
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

export default function Profile() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const email = await AsyncStorage.getItem("loggedInUser");
        if (email) {
          const userData = await AsyncStorage.getItem(`user_${email}`);
          if (userData) {
            setUser(JSON.parse(userData));
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("loggedInUser");
    navigation.replace("login"); 
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission required", "Please allow access to gallery.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // square crop
      quality: 0.7,
    });

    if (!result.canceled) {
      try {
        const email = await AsyncStorage.getItem("loggedInUser");
        if (!email) return;

        const updatedUser = { ...user, avatar: result.assets[0].uri };
        await AsyncStorage.setItem(`user_${email}`, JSON.stringify(updatedUser));
        setUser(updatedUser);
        Alert.alert("✅ Success", "Profile picture updated!");
      } catch (e) {
        console.error(e);
        Alert.alert("❌ Error", "Failed to update picture.");
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#907df8ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.navigate("home")}
        >
          <Text style={styles.backText}>⬅ Back</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Avatar */}
        <Pressable style={styles.avatarCircle} onPress={pickImage}>
          {user?.avatar ? (
            <Image
              source={{ uri: user.avatar }}
              style={{ width: 120, height: 120, borderRadius: 60 }}
            />
          ) : (
            <Text style={styles.avatarEmoji}>👩</Text>
          )}
        </Pressable>
        <Text style={{ marginTop: 8, color: "#555" }}>
          Tap to change profile picture
        </Text>

        {/* Info Boxes */}
        <View style={styles.infoBox}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.info}>{user?.name || "N/A"}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.info}>{user?.email || "N/A"}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Strand</Text>
          <Text style={styles.info}>{user?.strand || "N/A"}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Grade</Text>
          <Text style={styles.info}>{user?.grade || "N/A"}</Text>
        </View>

        {/* Log Out Button */}
        <Pressable
          style={[styles.logoutButton, { backgroundColor: "#e06666" }]}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>🚪 Log Out</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#a0b3f3ff" },

  header: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 5,
    backgroundColor: "#a0b3f3ff",
    borderBottomWidth: 1,
    borderBottomColor: "#a0b3f3ff",
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
    borderRadius: 10,
  },
  logoutText: { color: "white", fontSize: 16, fontWeight: "600" },
});
