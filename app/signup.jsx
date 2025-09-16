import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");
    if (!email || !password || !confirmPassword) {
      setError("Please fill all fields");
      Alert.alert("⚠️ Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      Alert.alert("Passwords do not match");
      return;
    }

    try {
      const existingUser = await AsyncStorage.getItem(`user_${email}`);
      if (existingUser) {
        setError("User already exists. Please log in.");
        Alert.alert("User already exists", "Please log in instead.");
        return;
      }

      const newUser = { email, password };
      await AsyncStorage.setItem(`user_${email}`, JSON.stringify(newUser));

      Alert.alert("✅ Success", "Account created! You can now log in.");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setError("");
      router.replace("login");
    } catch (e) {
      console.error(e);
      setError("Something went wrong. Please try again.");
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account ✨</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setError("");
        }}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setError("");
        }}
        secureTextEntry
        style={styles.input}
      />

      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => {
          setConfirmPassword(text);
          setError("");
        }}
        secureTextEntry
        style={styles.input}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>

      {/* 👇 navigate back to Login */}
      <Pressable onPress={() => router.push("login")}>
        <Text style={styles.link}>Already have an account? Log In</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 30, textAlign: "center" },
  input: {
    width: "90%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#cab0caff",
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    width: "90%",
    backgroundColor: "#907df8ff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: { color: "white", fontWeight: "bold" },
  link: { color: "#957cf0ff", marginTop: 10 },
  error: {
    width: "90%",
    color: "#2e2236ff",
    marginBottom: 8,
    textAlign: "left",
  },
});
