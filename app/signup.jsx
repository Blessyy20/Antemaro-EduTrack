import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert("⚠️ Please fill all fields");
      return;
    }

    try {
      const existingUser = await AsyncStorage.getItem(`user_${email.toLowerCase()}`);

      if (existingUser !== null) {
        Alert.alert("User already exists", "Please log in instead.");
        return;
      }

      const user = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password.trim(),
      };

      await AsyncStorage.setItem(`user_${user.email}`, JSON.stringify(user));

      Alert.alert("✅ Account created!", "Please log in.");
      router.replace("/login"); // Redirect to login screen, assuming login page is /app/login.js
    } catch (error) {
      Alert.alert("❌ Signup failed", "Please try again later.");
      console.error("Signup error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Your EduTrack Account</Text>

      <TextInput
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>

      <Pressable onPress={() => router.push("/login")}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#f3f0ff" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 30, textAlign: "center", color: "#4b2995" },
  input: {
    width: "90%",
    padding: 14,
    borderWidth: 1,
    borderColor: "#9b8bf6",
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "white",
    fontSize: 16,
    color: "#4b2995",
  },
  button: {
    width: "90%",
    backgroundColor: "#7a68bbff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "#8672ddff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 18 },
  link: { color: "#6a1b9a", marginTop: 15, textDecorationLine: "underline", fontSize: 15 },
});