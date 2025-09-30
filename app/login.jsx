import React, { useContext, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "../hooks/useUser";

export default function Login() {
  const router = useRouter();
  const { loginUser } = useUser()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("⚠️ Fill all fields");
      return;
    }

    try {
      await loginUser(email, password); // ✅ sets currentUserEmail
      router.replace("/home");
    } catch (e) {
      Alert.alert("⚠️ Error", e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back! 🩷</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </Pressable>

      <Pressable onPress={() => router.push("/signup")}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 30 },
  input: { width: "90%", padding: 12, borderWidth: 1, borderColor: "#cab0caff", borderRadius: 8, marginBottom: 15 },
  button: { width: "90%", backgroundColor: "#7e6fd4ff", padding: 15, borderRadius: 8, alignItems: "center", marginVertical: 10 },
  buttonText: { color: "white", fontWeight: "bold" },
  link: { color: "#957cf0ff", marginTop: 10 },
});
